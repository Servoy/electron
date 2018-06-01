var fs = require('fs');

module.exports = function () {
  var data = fs.readFileSync('/etc/resolv.conf', {encoding: 'utf8'});

  var lines = data.split('\n');

  var results = {
    nameserver: [],
    search: []
  };
  
  lines.forEach(function (line) {
    var fields = line.split(/\s+/);

    if (fields[0] === 'nameserver') {
      results.nameserver.push(fields[1]);
    } else if (fields[0] === 'search') {
      fields.slice(1).forEach(function (searchEntry) {
        results.search.push(searchEntry);
      });
    }
  });

  return results;
};
