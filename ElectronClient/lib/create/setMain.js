'use-strict'

const serialHooks = require('electron-packager/hooks').serialHooks
const optionsFactory = require('./../options/optionsMain');
const ProgressView = require('./../helpers/ProgressView');
const helpers = require('./../helpers/helpers');
const packager = require('electron-packager');
const {rebuild} = require('electron-rebuild');
const setIcon = require('./setIcon');
const hasBinary = require('hasbin');
const setApp = require('./setApp');
const log = require('loglevel');
const async = require('async');
const path = require('path');
const tmp = require('tmp');
const ncp = require('ncp');
const copy = ncp.ncp;
var progress = null;

/**
 * Checks if the electron-packager was completed by checking if the path array
 * is filled
 * @param appPathArray
 * @returns {*}
 */
function getAppPath(appPathArray) {
  if (appPathArray.length === 0) {
    return null;
  }
  if (appPathArray.length > 1) {
    log.warn('Warning: This should not be happening, packaged app path contains more than one element:', appPathArray);
  }
  return appPathArray[0];
}

/**
 * Removes the `icon` parameter from options if building for Windows while not on Windows
 * and Wine is not installed
 * @param options
 */
function checkIconOption(options) {
  const packageOptions = JSON.parse(JSON.stringify(options));
  if (options.platform === 'win32' && !helpers.isWindows()) {
    if (!hasBinary.sync('wine')) {
      log.warn('Wine is required to set the icon for a Windows app when packaging on non-windows platforms');
      packageOptions.icon = null;
    }
  }
  return packageOptions;
}

/**
 * For windows and linux, we have to copy over the icon to the resources/app folder, which the
 * BrowserWindow is hard coded to read the icon from
 * @param {{}} options
 * @param {string} appPath
 * @param callback
 */
function checkCopyIcons(options, appPath, callback) {
  if (!options.icon) {
    callback();
    return;
  }
  if (options.platform === 'darwin' || options.platform === 'mas') {
    callback();
    return;
  }
  // windows & linux
  // put the icon file into the app
  const destIconPath = path.join(appPath, 'resources/app');
  const destFileName = `icon${path.extname(options.icon)}`;
  copy(options.icon, path.join(destIconPath, destFileName), (error) => {
    callback(error);
  });
}

/**
 * Removes invalid parameters from options if building for Windows while not on Windows
 * and Wine is not installed
 * @param options
 */
function removeInvalidOptions(options, param) {
  const packageOptions = JSON.parse(JSON.stringify(options));
  if (options.platform === 'win32' && !helpers.isWindows()) {
    if (!hasBinary.sync('wine')) {
      log.warn(`Wine is required to use "${param}" option for a Windows app when packaging on non-windows platforms`);
      packageOptions[param] = null;
    }
  }
  return packageOptions;
}

/**
 * Removes the `appCopyright` parameter from options if building for Windows while not on Windows
 * and Wine is not installed
 * @param options
 */
function checkAppCopyrightOption(options) {
  return removeInvalidOptions(options, 'appCopyright');
}

/**
 * Removes the `buildVersion` parameter from options if building for Windows while not on Windows
 * and Wine is not installed
 * @param options
 */
function checkBuildVersionOption(options) {
  return removeInvalidOptions(options, 'buildVersion');
}

/**
 * Removes the `appVersion` parameter from options if building for Windows while not on Windows
 * and Wine is not installed
 * @param options
 */
function checkAppVersionOption(options) {
  return removeInvalidOptions(options, 'appVersion');
}

/**
 * Removes the `versionString` parameter from options if building for Windows while not on Windows
 * and Wine is not installed
 * @param options
 */
function checkVersionStringOption(options) {
  return removeInvalidOptions(options, 'versionString');
}

/**
 * Removes the `win32metadata` parameter from options if building for Windows while not on Windows
 * and Wine is not installed
 * @param options
 */
function checkWin32metadataOption(options) {
  return removeInvalidOptions(options, 'win32metadata');
}

function setProgress(platform){
  if(platform !== 'windows'){
    progress = new ProgressView(6);
  } else {
    progress = new ProgressView(5);
  }
}

function checkElectronVersion(options){
    console.log(process.versions.electron);
}

/**
 * @param {{}} inputOptions
 * @param {createAppCallback} callback
 */
function setMain(inputOptions, callback) {
  const options = Object.assign({}, inputOptions);
  console.log(inputOptions);
  // pre process app
  const tmpObj = tmp.dirSync({unsafeCleanup: true});
  const tmpPath = tmpObj.name;
  setProgress(inputOptions.platform);
  async.waterfall([
    (cb) => {
      progress.tick('interpretation process');
      optionsFactory(options)
        .then((result) => {
          cb(null, result);
        }).catch((error) => {
          cb(error);
        });
    },
    (opts, cb) => {
      progress.tick('copying app');
      setApp(opts.dir, tmpPath, opts, (error) => {
        if (error) {
          cb(error);
          return;
        } else {
        // Change the reference file for the Electron app to be the temporary path
        console.log("application succesfully copied");
        const newOptions = Object.assign({}, opts, { dir: tmpPath });
        cb(null, newOptions);
      }
      });
    },
    (opts, cb) => {
      if(inputOptions.platform !== 'windows') {
      progress.tick('rebuilding modules');
      const rebuildOptions = {
        electronVersion: opts.electronVersion,
        arch: opts.arch,
        buildPath: tmpPath,
        onlyModules: ['printer', 'serialport'],
        headerURL: "https://atom.io/download/atom-shell"
      }

      rebuild(rebuildOptions)
      .then(() => {
        console.info('modules succesfully rebuilded')
        cb(null, opts);
      })
      .catch((e) => {
        console.error("building modules didn't work!");
        console.error(e);
      });
    } else {
        cb(null, opts);
    }
    },
    (opts, cb) => {
      progress.tick('setting icons');
      setIcon(opts, (error, optionsWithIcon) => {
        cb(null, optionsWithIcon);
      });
    },
    (opts, cb) => {
      progress.tick('packaging application');
      // skip passing icon parameter to electron packager if needed
      let packageOptions = checkIconOption(opts);
      // skip passing other parameters to electron packager if needed
      packageOptions = checkAppCopyrightOption(packageOptions);
      packageOptions = checkAppVersionOption(packageOptions);
      packageOptions = checkBuildVersionOption(packageOptions);
      packageOptions = checkVersionStringOption(packageOptions);
      packageOptions = checkWin32metadataOption(packageOptions);
      packager(packageOptions,  (error, appPathArray) => {
        if(error) {
          cb(error);
          return;
        }
        console.log("application succesfully packaged");
        cb(error, opts, appPathArray);
      });
    },
    (opts, appPathArray, cb) => {
      progress.tick('finalizing app');
      const appPath = getAppPath(appPathArray);
      if (!appPath) {
        cb();
        return;
      }
      checkCopyIcons(opts, appPath, (error) => {
        cb(error, appPath);
      });
      console.log("application ready!");
    },
  ], (error, appPath) => {
    callback(error, appPath);
  });
}

module.exports = setMain;
