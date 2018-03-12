const scopes = require('./scopes');

function resultArrayToObject(scopeResults) {
  return scopeResults.reduce((accumulator, value) => Object.assign({}, accumulator, value), {});
}

function interpretationOptions(oldOptions, scopeResults) {
  const newOptions = resultArrayToObject(scopeResults);
  return Object.assign({}, oldOptions, newOptions);
}

// Takes the options object and inpretet new values
// which may need async work
module.exports = function (options) {
  const tasks = scopes(options);
  return Promise.all(tasks)
    .then(scopeResults => interpretationOptions(options, scopeResults));
}
