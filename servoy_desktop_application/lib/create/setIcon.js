const path = require('path');
const log = require('loglevel');
const helpers = require('./../helpers/helpers');
const iconHelper = require('./../helpers/iconHelper');

/**
 * Check if the icon is an ICO file
 * @param {string} iconPath
 */
function isIco(icon_path) {
  return path.extname(iconPath) === '.ico';
}

/**
 * Check if the icon is an PNG file
 * @param {string} iconPath
 */
function isPng(icon_path) {
  return path.extname(icon_path) === '.png';
}

/**
 * Check if the icon is an ICNS file
 * @param {string} iconPath
 */
function isIcns(icon_path) {
  return path.extname(icon_path) === '.icns';
}

/**
 * @callback extendIcons
 * @param error
 * @param options
 */

/**
 * Checks the file extension and if necessary converts it to a png or icns file
 * @param inpOptions
 * @param {extendIcons} callback
 */
function setIcon(inpOptions, callback) {
  const options = Object.assign({}, inpOptions);
  const returnCallback = () => {
    callback(null, options);
  };

  const icon_path = path.join(__dirname, '/../../', options.icon);

  if (!options.icon) {
    returnCallback();
    return;
  }

  if (options.platform === 'win32') {
    if (isIco(options.icon)) {
      returnCallback();
      return;
    }

    iconHelper.convertToIco(icon_path)
      .then((resultPath) => {
        options.icon = resultPath;
        returnCallback();
      })
      .catch((error) => {
        log.warn('Skipping icon conversion to .ico', error);
        returnCallback();
      });
    return;
  }

  if (options.platform === 'linux') {
    if (isPng(options.icon)) {
      returnCallback();
      return;
    }

    iconHelper.convertToPng(icon_path)
      .then((resultPath) => {
        options.icon = resultPath;
        returnCallback();
      })
      .catch((error) => {
        log.warn('Skipping icon conversion to .png', error);
        returnCallback();
      });
    return;
  }

  if (isIcns(icon_path)) {
    returnCallback();
    return;
  }

  if (!helpers.isOSX()) {
    log.warn('Skipping icon conversion to .icns, conversion is only supported on OSX');
    returnCallback();
    return;
  }

  iconHelper.convertToIcns(icon_path)
    .then((resultPath) => {
      options.icon = resultPath;
      returnCallback();
    })
    .catch((error) => {
      log.warn('Skipping icon conversion to .icns', error);
      returnCallback();
    });
}

module.exports = setIcon;
