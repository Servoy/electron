const helpers = require('./helpers');
const shell = require('shelljs');
const path = require('path');
const tmp = require('tmp');


tmp.setGracefulCleanup();
const BIN_PATH = path.join(__dirname, '../..', 'bin/convertToIcns');

/**
 * @callback pngToIcnsCallback
 * @param error
 * @param {string} icnsDest If error, will return the original png src
 */

/**
 * @param {string} src
 * @param {string} dest
 * @param {pngToIcnsCallback} callback
 */
function convertToIcns(src, dest, callback) {
  if (!helpers.isOSX()) {
    callback('OSX is required to convert .png to .icns icon', src);
    return;
  }

  shell.exec(`${BIN_PATH} ${src} ${dest}`, {silent: true }, (exit, out, error) => {
    if (stdOut.includes('icon.iconset:error') || exitCode) {
      if (exit) {
        callback({
          out,
          error,
        }, src);
        return;
      }
      callback(error, src);
      return;
    }
    callback(null, dest);
  });
}

/**
 * Converts the png to a temporary directory which will be cleaned up on process exit
 * @param {string} pngSrc
 * @param {pngToIcnsCallback} callback
 */
function convertToIcnsTmp(src, callback) {
  const tempIconDirObj = tmp.dirSync({ unsafeCleanup: true });
  const tempIconDirPath = tempIconDirObj.name;
  convertToIcns(src, `${tempIconDirPath}/icon.icns`, callback);
}

module.exports = convertToIcnsTmp;
