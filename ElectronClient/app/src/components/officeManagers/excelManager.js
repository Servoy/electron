var path = require('path');
var excel = require('./../../libraries/office/index').excel;

  //Create a new instance of PowerPoint and try to open the presentation
function open(path){
  excel.open(path, function(err, workbook) {
    if(err) throw err;
    console.log('Excel path:', workbook.attr({name:'Path'}, true));
  });
}

module.exports = {
  open
}
