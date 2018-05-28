var path = require('path');
var powerpoint = require('./../../../libraries/office/index').powerpoint;

  //Create a new instance of PowerPoint and try to open the presentation
function open(path){
  powerpoint.open(path, function(err, presentation) {
    if(err) throw err;
    //use presentation object
    console.log('Presentation path:', presentation.attr({name:'Path'}, true));
    //Get slides
    presentation.slides(null, function(err, slides) {
      if(err) throw err;
      console.log('Slides count:', slides.length);
      //get shapes on slide 1
      slides[0].shapes(null, function(err, shapes) {
        console.log('Shape count on slide 1:', shapes.length);
        shapes[0].attr({'name':'Text', 'value': 'Fu Bar'}, true); //Set text value
        console.log('Get text first shape:', shapes[0].attr({'name':'Text'}, true));
        //close presentation
        presentation.close(null, function(err) {
          if(err) throw err;
          //exit powerpoint
          powerpoint.quit()
        });
      });
    });
});
}

module.exports = {
  open
}
