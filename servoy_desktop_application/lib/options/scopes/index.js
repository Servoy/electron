const icon = require('./icon');
const userAgent = require('./userAgent');
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
// value to a object containing its fieldname
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
// with the following result: {[fieldName]: fieldvalue}
module.exports = function(options) {
  console.log(options);
  return scopes.map(({scope, task}) => wrap(scope, task, options));
}
