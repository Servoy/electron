#!/usr/bin/env node
'use strict';

var _cli = require('./cli.js');

var _cli2 = _interopRequireDefault(_cli);

var _index = require('../lib/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Main process.
 *
 * @param {CLIOptions} options Options.
 *
 * @return {Promise} Promise object.
 */
function execute(options) {
  return new Promise((resolve, reject) => {
    if (!options.input) {
      return reject(new Error('"-i" or "--input" has not been specified. This parameter is required.'));
    }

    if (!options.output) {
      return reject(new Error('"-o" or "--output" has not been specified. This parameter is required.'));
    }

    return (0, _index2.default)(options.input, options.output, options);
  });
}

/**
 * Entry point of the CLI.
 *
 * @param {Array.<String>} argv   Arguments of the command line.
 * @param {WritableStream} stdout Standard output.
 *
 * @return {Promise} Promise object.
 */
function main(argv, stdout) {
  const options = _cli2.default.parse(argv);
  if (options.help) {
    return _cli2.default.showHelp(stdout);
  } else if (options.version) {
    return _cli2.default.showVersion(stdout);
  }

  return execute(options);
}

main(process.argv.slice(2), process.stdout).then().catch(err => {
  console.error(err);
});