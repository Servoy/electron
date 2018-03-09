const log = require('loglevel');
const {transformFilename} = require('./../../utils');
const {interpretTitle} = require('./../../interpretation');
const {DEFAULT_APP_NAME} = require('./../../constants');

function interpretName({name, targetUrl}) {
  if (name && name.length > 0) {
    return Promise.resolve(name);
  }

  return interpretTitle(targetUrl)
    .then(pageTitle => (pageTitle || DEFAULT_APP_NAME))
    .catch((error) => {
      log.warn(`Unable to automatically determine app name, falling back to '${DEFAULT_APP_NAME}'. Reason: ${error}`);
      return DEFAULT_APP_NAME;
    });
}

module.exports = function ({ platform, name, targetUrl }) {
  return interpretName({ name, targetUrl })
    .then(result => transformFilename(platform, result));
}
