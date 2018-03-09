const shell = require('shelljs');
const path = require('path');
const temp = require('tmp');
const helpers = require('./helpers');
const { isWindows, isOSX } = helpers;

temp.setGracefulCleanup();

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
function iconHelper(scriptPath, src, dest) {
  return new Promise((resolve, reject) => {
    if (isWindows()) {
      reject(new Error('OSX or Linux is required'));
      return;
    }

    shell.exec(`${scriptPath} ${src} ${dest}`, {silent: true}, (exitCode, stdOut, stdError) => {
      console.log(stdError);
      if (exitCode) {
        reject({
          stdOut,
          stdError,
        });
        return;
      }
      resolve(dest);
    });
  });
}

/**
 * Get the path of the temporary directory
 * @return {string} path
 */
function getTmpDirPath() {
  const tempIconDirObj = temp.dirSync({ unsafeCleanup: true });
  return tempIconDirObj.name;
}

/**
 * Converts the ico to a temporary directory which will be cleaned up on process exit
 * @param {string} src path to a .ico file
 * @return {Promise}
 */
function singleIco(src) {
  return iconHelper(BINARY_SCRIPTS.singleIco, src, `${getTmpDirPath()}/icon.ico`);
}

/**
 * Converts the ico to a temporary directory which will be cleaned up on process exit
 * @param {string} src path to a .ico file
 * @return {Promise}
 */
function convertToPng(src) {
  return iconHelper(BINARY_SCRIPTS.convertToPng, src, `${getTmpDirPath()}/icon.png`);
}

/**
 * Converts the ico to a temporary directory which will be cleaned up on process exit
 * @param {string} src path to a image file
 * @return {Promise}
 */
function convertToIco(src) {
  return iconHelper(BINARY_SCRIPTS.convertToIco, src, `${getTmpDirPath()}/icon.ico`);
}

/**
 * Converts the ico to a temporary directory which will be cleaned up on process exit
 * @param {string} src path to a image file
 * @return {Promise}
 */
function convertToIcns(src) {
  if (!isOSX()) {
    return new Promise((resolve, reject) => reject(new Error('OSX is required to convert to a .icns icon')));
  }
  return iconHelper(BINARY_SCRIPTS.convertToIcns, src, `${getTmpDirPath()}/icon.icns`);
}

module.exports = {
  singleIco,
  convertToPng,
  convertToIco,
  convertToIcns,
};
