const validator = require('validator');
const url = require('url');

/**
 * Appends the protocol
 * @param {String} testUrl
 * @return {string} returns the testUrl
 */
function appendProtocol(testUrl) {
  const parsed = url.parse(testUrl);
  if (!parsed.protocol) {
    return `http://${testUrl}`;
  }
  return testUrl;
}

/**
 * Alter the url
 * @param {String} testUrl
 * @return {string} returns the testUrl
 */
function alterUrl(testUrl) {
  const protocolURL = appendProtocol(testUrl);
  const validatorOptions = {
    require_protocol: true,
    require_tld: false,
    allow_trailing_dot: true,
  };
  if (!validator.isURL(protocolURL, validatorOptions)) {
    throw new Error(`Your Url: "${protocolURL}" is invalid!`);
  }
  return protocolURL;
}

module.exports = alterUrl;
