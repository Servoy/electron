const url = require('url');
const validator = require('validator');

function appendProtocol(testUrl) {
  const parsed = url.parse(testUrl);
  if (!parsed.protocol) {
    return `http://${testUrl}`;
  }
  return testUrl;
}

function alterUrl(testUrl) {
  const urlWithProtocol = appendProtocol(testUrl);

  const validatorOptions = {
    require_protocol: true,
    require_tld: false,
    allow_trailing_dot: true,
  };
  if (!validator.isURL(urlWithProtocol, validatorOptions)) {
    throw new Error(`Your Url: "${urlWithProtocol}" is invalid!`);
  }
  return urlWithProtocol;
}

module.exports = alterUrl;
