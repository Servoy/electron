const userAgent = require('./userAgent');
const icon = require('./icon');
const name = require('./name');

const scopes = [{
  scope: 'userAgent',
  task: userAgent,
}, {
  scope: 'icon',
  task: icon,
}, {
  scope: 'name',
  task: name,
}];

// Modifies the result of each promise from a scalar
// value to a object containing its scope name
function wrap(scopeName, promise, args) {
  try {
    return promise(args)
      .then(result => ({
        [scopeName]: result,
      }));
  } catch(err) {
  }
}

// Returns a list of promises which will all resolve
// with the following result: {[scopeName]: scopeValue}
module.exports = function(options) {
  return scopes.map(({scope, task}) => wrap(scope, task, options));
}
