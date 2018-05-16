var path = require('path');
var word = require('./../../libraries/office/index').word;

  //Create a new instance of PowerPoint and try to open the presentation
function open(path){
  excel.open(path, function(err, document) {
    if(err) throw err;
    console.log('Word path:', document.attr({name:'Path'}, true));
  });
}

module.exports = {
  open
}
