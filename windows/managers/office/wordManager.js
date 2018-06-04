var path = require('path');
var word = require('./../../../libraries/office-library/index').word;

  //Create a new instance of Word and try to open the document
function open(path){
  word.open(path, function(err, document) {
    if(err) throw err;
    console.log('Word path:', document.attr({name:'Path'}, true));
  });
}

module.exports = {
  open
}
