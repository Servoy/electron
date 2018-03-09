const _ = require('lodash');
const sanitizeFilenameLib = require('sanitize-filename');
const { DEFAULT_APP_NAME } = require('./../constants');

module.exports = function (platform, str) {
  let result = sanitizeFilenameLib(str);

  console.log(result);
  // remove all non ascii or use default app name
  result = result.replace(/[^\x00-\x7F]/g, '') || DEFAULT_APP_NAME;
  // spaces will cause problems with Ubuntu when pinned to the dock
  if (platform === 'linux') {
    return _.kebabCase(result);
  }
  return result;
}
