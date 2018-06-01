'use strict';

var _iconGenerator = require('./icon-generator.js');

var _iconGenerator2 = _interopRequireDefault(_iconGenerator);

var _logger = require('./logger.js');

var _logger2 = _interopRequireDefault(_logger);

var _cli = require('../bin/cli.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Generate an icon = require(the SVG file.
 *
 * @param {String} src     SVG file path.
 * @param {String} dest    Destination directory path.
 * @param {Object} options Options.
 */
module.exports = function (src, dest, options = _cli.DEFAULT_OPTIONS) {
  const opt = options;
  if (!opt.modes) {
    opt.modes = _cli.DEFAULT_OPTIONS.modes;
  }

  if (!opt.names) {
    opt.names = _cli.DEFAULT_OPTIONS.names;
  }

  if (!opt.names.ico) {
    opt.names.ico = _cli.DEFAULT_OPTIONS.names.ico;
  }

  if (!opt.names.icns) {
    opt.names.icns = _cli.DEFAULT_OPTIONS.names.icns;
  }

  const logger = new _logger2.default(opt.report);
  switch (opt.type) {
    case 'png':
      return _iconGenerator2.default.fromPNG(src, dest, opt, logger);

    default:
      return _iconGenerator2.default.fromSVG(src, dest, opt, logger);
  }
};