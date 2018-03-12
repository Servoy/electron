const path = require('path');
const log = require('loglevel');
const helpers = require('./../helpers/helpers');
const iconHelper = require('./../helpers/iconHelper');

/**
 * Check if the icon is an ICO file
 * @param {string} iconPath
 */
function isIco(iconPath) {
  return path.extname(iconPath) === '.ico';
}

/**
 * Check if the icon is an PNG file
 * @param {string} iconPath
 */
function isPng(iconPath) {
  return path.extname(iconPath) === '.png';
}

/**
 * Check if the icon is an ICNS file
 * @param {string} iconPath
 */
function isIcns(iconPath) {
  return path.extname(iconPath) === '.icns';
}

/**
 * @callback iconsCallback
 * @param error
 * @param options
 */

/**
 * Converts an icon from png to icn. If the icon is no png then it converts
 * it to png first. It will fill options.icon.
 * @param inputOptions
 * @param {iconsCallback} callback
 */
function setIcon(inputOptions, callback) {
  const options = Object.assign({}, inputOptions);
  const returnCallback = () => {
    callback(null, options);
  };

  const icon_path = path.join(__dirname, '/../../', options.icon);

  if (!options.icon) {
    returnCallback();
    return;
  }

  if (options.platform === 'win32') {
    if (iconIsIco(options.icon)) {
      returnCallback();
      return;
    }

    iconHelper.convertToIco(icon_path)
      .then((destination) => {
        options.icon = destination;
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
      .then((destination) => {
        options.icon = destination;
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
    .then((destination) => {
      // (outPath);
      options.icon = destination;
      returnCallback();
    })
    .catch((error) => {
      log.warn('Skipping icon conversion to .icns', error);
      returnCallback();
    });
}

module.exports = setIcon;
