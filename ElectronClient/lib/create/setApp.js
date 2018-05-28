const program = require('commander');
const crypto = require('crypto');
const log = require('loglevel');
const asar = require('asar');
const path = require('path');
const util = require('util');
const _ = require('lodash');
const fs =  require('fs');
const ncp = require('ncp');
const q = require('q');
const copy = ncp.ncp;

/**
 * Pass arguments to servoy.json
 * @param options
 */
function appArgs(options) {
  return {
    name: options.name,
    targetUrl: options.targetUrl,
    counter: options.counter,
    width: options.width,
    height: options.height,
    minWidth: options.minWidth,
    minHeight: options.minHeight,
    maxWidth: options.maxWidth,
    maxHeight: options.maxHeight,
    icon: options.icon,
    x: options.x,
    y: options.y,
    showMenuBar: options.showMenuBar,
    fastQuit: options.fastQuit,
    userAgent: options.userAgent,
    servoyVersion: options.servoyVersion,
    ignoreCertificate: options.ignoreCertificate,
    ignoreGpuBlacklist: options.ignoreGpuBlacklist,
    enableEs3Apis: options.enableEs3Apis,
    insecure: options.insecure,
    flashPluginDir: options.flashPluginDir,
    diskCacheSize: options.diskCacheSize,
    fullScreen: options.fullScreen,
    hideWindowFrame: options.hideWindowFrame,
    maximize: options.maximize,
    disableContextMenu: options.disableContextMenu,
    disableDevTools: options.disableDevTools,
    zoom: options.zoom,
    internalUrls: options.internalUrls,
    crashReporter: options.crashReporter,
    singleInstance: options.singleInstance,
    appCopyright: options.appCopyright,
    appVersion: options.appVersion,
    buildVersion: options.buildVersion,
    win32metadata: options.win32metadata,
    versionString: options.versionString,
    processEnvs: options.processEnvs,
    fileDownloadOptions: options.fileDownloadOptions,
    tray: options.tray,
    basicAuthUsername: options.basicAuthUsername,
    basicAuthPassword: options.basicAuthPassword,
  };
}

/**
 * Injects the scripts in the right folder when packaging an app
 * @param {string} src
 * @param {string} dest
 */
function injectScripts(src, dest) {
  if (!src) {
    return new Promise((resolve) => {
      resolve();
    });
  }

  const promises = src.map(src => new Promise((resolve, reject) => {
    if (!fs.existsSync(src)) {
      reject(new Error('Error copying injection files: file not found'));
      return;
    }
    let destFileName;
    if (path.extname(src) === '.js') {
      destFileName = 'inject.js';
    } else if (path.extname(src) === '.css') {
      destFileName = 'inject.css';
    } else {
      resolve();
      return;
    }

    copy(src, path.join(dest, 'inject', destFileName), (error) => {
      if (error) {
        reject(new Error(`Error Copying injection files: ${error}`));
        return;
      }
      resolve();
    });
  }));

  return new Promise((resolve, reject) => {
    Promise.all(promises)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * Alter the app name so their is no collision
 * @param {string} appName
 * @param {string} url
 */
function alterAppName(appName, url) {
  const hash = crypto.createHash('md5');
  hash.update(url);
  const postFixHash = hash.digest('hex').substring(0, 6);
  const altered = _.kebabCase(appName.toLowerCase());
  return `${altered}-servoy-${postFixHash}`;
}

/**
 * Set the name of the package.json
 * @param {string} appPath
 * @param {string} name
 * @param {string} url
 */
function setPackageName(appPath, name, url) {
  const packageJsonPath = path.join(appPath, '/package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));
  packageJson.name = alterAppName(name, url);
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson));
}

/**
 * Set the URL
 * @param {string} appPath
 * @param {string} name
 * @param {string} url
 */
function setURL(configPath, url){
  const config = JSON.parse(fs.readFileSync(configPath));
  config.options.url = url;
  fs.writeFileSync(configPath, JSON.stringify(config));
}

/**
 * Creates a temporary directory and copies the './app folder' inside,
 * and adds a text file with the configuration for the single page app.
 *
 * @param {string} src
 * @param {string} dest
 * @param {{}} options
 * @param callback
 */
function setApp(source, destination, options, callback) {
  const args = appArgs(options);
  const srcFolder = path.join(destination, '/src');
  const configPath = path.join(destination, '/config/servoy.json');
  // const asarApp = path.join(destination, '/app.asar');

  copy(source, destination, (error) => {
    if (error) {
      callback(`Error Copying temporary directory: ${error}`);
      return;
    }
    fs.writeFileSync(path.join(destination, '/servoy-settings.json'), JSON.stringify(args));
    copy(srcFolder, destination, (error) => {
      if (error) {
        callback(`Error Copying temporary directory: ${error}`);
        return;
      }
    });
    // asar.createPackage(srcApp, asarApp, function(){
    //     console.log('done.');
    // });
    injectScripts(options.inject, destination)
      .catch((err) => {
        log.warn(err);
      })
      .then(() => {
        setPackageName(destination, args.name, args.targetUrl);
        setURL(configPath, args.targetUrl);
        callback();
      });
  });
}

module.exports = setApp;
