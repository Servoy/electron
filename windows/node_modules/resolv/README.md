# resolv
Parse resolv.conf in node.js

Requiring and executing this model stores the info in resolv.conf to a
JavaScript object.

```shell
$ node
> console.log(require('./resolv.js')())
{ nameserver: [ '192.168.1.1' ],
  search: [ 'searchdomain.example.com' ] }
```

or

```javascript
var resolv = require('./resolv.js')();

console.log(resolv.nameserver);
console.log(resolv.search);
```
