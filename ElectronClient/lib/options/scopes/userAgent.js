const {interpretUserAgent} = require('./../../interpretation');

module.exports = function ({userAgent, electronVersion, platform}) {
  if (userAgent) {
    return Promise.resolve(userAgent);
  }

  return interpretUserAgent.interpretUserAgent(electronVersion, platform);
}
