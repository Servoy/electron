const log = require('loglevel');
const config = require('../../../app/config/servoy.json');
const fs = require('fs');

/**
 * Get the icon path
 * @return {String} icon path
 */
function getIcon(){
  return config.options.icon;
}

module.exports = function({targetUrl, platform }) {
  const icon = getIcon();
  if (icon !== null) {
    return Promise.resolve(icon);
  }
}
