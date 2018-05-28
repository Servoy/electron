const {interpretPlatform, interpretArch} = require('./../interpretation/interpretOs');
const {ELECTRON_VERSION, PLACEHOLDER_APP_DIR } = require('./../constants');
const packageJson = require('./../../package.json');
const asyncConfig = require('./asyncConfig');
const selectIcon = require('./scopes/icon');
const alterUrl = require('./alterUrl');
const log = require('loglevel');

/**
 * Extracts only desired keys from inpOptions and fills the rest with defaults
 * @param {Object} inpOptions
 * @returns {Promise}
 */
module.exports = function (inpOptions) {
  const options = {
    dir: PLACEHOLDER_APP_DIR,
    name: inpOptions.name,
    targetUrl: alterUrl(inpOptions.targetUrl),
    platform: inpOptions.platform || interpretPlatform(),
    arch: inpOptions.arch || interpretArch(),
    electronVersion: inpOptions.electronVersion || ELECTRON_VERSION,
    servoyVersion: packageJson.version || null,
    out: inpOptions.out || process.cwd(),
    overwrite: inpOptions.overwrite,
    asar: inpOptions.conceal || false,
    icon: inpOptions.icon || null,
    counter: inpOptions.counter || false,
    width: inpOptions.width || 1280,
    height: inpOptions.height || 800,
    minWidth: inpOptions.minWidth || 0,
    minHeight: inpOptions.minHeight || 0,
    maxWidth: inpOptions.maxWidth || 0,
    maxHeight: inpOptions.maxHeight || 0,
    showMenuBar: inpOptions.showMenuBar || false,
    fastQuit: inpOptions.fastQuit || false,
    userAgent: inpOptions.userAgent,
    ignoreCertificate: inpOptions.ignoreCertificate || false,
    ignoreGpuBlacklist: inpOptions.ignoreGpuBlacklist || false,
    enableEs3Apis: inpOptions.enableEs3Apis || false,
    insecure: inpOptions.insecure || false,
    flashPluginDir: inpOptions.flashPath || inpOptions.flash || null,
    diskCacheSize: inpOptions.diskCacheSize || null,
    inject: inpOptions.inject || null,
    ignore: 'src',
    fullScreen: inpOptions.fullScreen || false,
    maximize: inpOptions.maximize || false,
    hideWindowFrame: inpOptions.hideWindowFrame || false,
    verbose: inpOptions.verbose || false,
    disableContextMenu: inpOptions.disableContextMenu || false,
    disableDevTools: inpOptions.disableDevTools || false,
    crashReporter: inpOptions.crashReporter || false,
    // workaround for electron-packager#375
    tmpdir: false,
    zoom: inpOptions.zoom || 0,
    internalUrls: inpOptions.internalUrls || null,
    singleInstance: inpOptions.singleInstance || false,
    appVersion: inpOptions.appVersion || null,
    buildVersion: inpOptions.buildVersion || null,
    appCopyright: inpOptions.appCopyright || null,
    versionString: inpOptions.versionString || null,
    win32metadata: inpOptions.win32metadata || {
      ProductName: inpOptions.name || null,
      InternalName: inpOptions.name || null,
      FileDescription: inpOptions.name || null,
    },
    processEnvs: inpOptions.processEnvs,
    fileDownloadOptions: inpOptions.fileDownloadOptions,
    tray: inpOptions.tray || false,
    basicAuthUsername: inpOptions.basicAuthUsername || null,
    basicAuthPassword: inpOptions.basicAuthPassword || null,
  };

  if (options.verbose) {
    log.setLevel('trace');
  } else {
    log.setLevel('error');
  }

  if (options.flashPluginDir) {
    options.insecure = true;
  }

  if (inpOptions.honest) {
    options.userAgent = null;
  }

  if (options.platform.toLowerCase() === 'windows') {
    options.platform = 'win32';
  }

  if (options.platform.toLowerCase() === 'osx' || options.platform.toLowerCase() === 'mac') {
    options.platform = 'darwin';
  }

  if (options.width > options.maxWidth) {
    options.width = options.maxWidth;
  }

  if (options.height > options.maxHeight) {
    options.height = options.maxHeight;
  }

  if (typeof inpOptions.x !== 'undefined') {
    options.x = inpOptions.x;
  }

  if (typeof inpOptions.y !== 'undefined') {
    options.y = inpOptions.y;
  }

  return asyncConfig(options);
}
