const shell = require('shelljs');
const path = require('path');
const tmp = require('tmp');
const helpers = require('./helpers');

tmp.setGracefulCleanup();

const BINARY_SCRIPTS = {
  singleIco: path.join(__dirname, '../..', 'bin/singleIco'),
  convertToPng: path.join(__dirname, '../..', 'bin/convertToPng'),
  convertToIco: path.join(__dirname, '../..', 'bin/convertToIco'),
  convertToIcns: path.join(__dirname, '../..', 'bin/convertToIcns'),
};

/**
 * Executes a shell script with the form "./pathToScript param1 param2"
 * @param {string} scriptPath
 * @param {string} src input .ico
 * @param {string} dest has to be a .ico path
 */
function iconShellHelper(scriptPath, src, dest) {
  return new Promise((resolve, reject) => {
    if (helpers.isWindows()) {
      reject(new Error('OSX or Linux is required'));
      return;
    }
    shell.exec(`${scriptPath} ${src} ${dest}`, { silent: true }, (exit, out, error) => {
      if (exit) {
        reject({
          out,
          error,
        });
        return;
      }

      resolve(dest);
    });
  });
}

function getTmpDirPath() {
  const tempIconDirObj = tmp.dirSync({ unsafeCleanup: true });
  return tempIconDirObj.name;
}

/**
 * Converts the ico to a temporary directory which will be cleaned up on process exit
 * @param {string} icoSrc path to a .ico file
 * @return {Promise}
 */
function singleIco(src) {
  return iconShellHelper(BINARY_SCRIPTS.singleIco, src, `${getTmpDirPath()}/icon.ico`);
}

/**
 * Converts the ico to a temporary directory which will be cleaned up on process exit
 * @param {string} src path to a .ico file
 * @return {Promise}
 */
function convertToPng(src) {
  return iconShellHelper(BINARY_SCRIPTS.convertToPng, src, `${getTmpDirPath()}/icon.png`);
}

/**
 * Converts the ico to a temporary directory which will be cleaned up on process exit
 * @param {string} src path to a image file
 * @return {Promise}
 */
function convertToIco(src) {
  return iconShellHelper(BINARY_SCRIPTS.convertToIco, src, `${getTmpDirPath()}/icon.ico`);
}

/**
 * Converts the ico to a temporary directory which will be cleaned up on process exit
 * @param {string} src path to a image file
 * @return {Promise}
 */

function convertToIcns(src) {
  if (!helpers.isOSX()) {
    return new Promise((resolve, reject) => reject(new Error('OSX is required to convert to a .icns icon')));
  }
  return iconShellHelper(BINARY_SCRIPTS.convertToIcns, src, `${getTmpDirPath()}/icon.icns`);
}

module.exports = {
  singleIco,
  convertToPng,
  convertToIco,
  convertToIcns,
};
