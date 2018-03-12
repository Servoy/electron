const settings = require(__dirname + './../config/servoy.json');
const uglify = require('uglify-js');
const path = require('path');
const fs = require('fs');

// Path where the scripts need to be uglified and combined
const INJECT_JS_PATH = path.join(__dirname, '../', 'preload/scripts.js');


/*
* This function injects the scripts into the webContents
*/
function injectScripts() {
  const needToInject = fs.existsSync(INJECT_JS_PATH);
  if (!needToInject) {
    return;
  }
  require(INJECT_JS_PATH);
}

/*
* This function uglifies the grabbed scripts from getScripts() and combines
* it inside scripts.js
*/
function uglifyScripts(){
  var uglified = uglify.minify(getScripts());
  fs.writeFile(path.join(__dirname, '../', 'preload/scripts.js'), uglified.code, function (err){
  if(err) {
    console.log(err);
  } else {
    console.log("Scripts combined, minified and saved in:", 'scripts.js');
  }
  });
}

/*
* This function grabs all the scripts specified in servoy.json
*/
function getScripts(){
  var sources = new Array();
  for(script in settings.injectScripts){
      sources.push(fs.readFileSync(path.join(__dirname, '../', settings.injectScripts[script]), 'utf8'));
  }
  return sources;
}

module.exports = {
  uglifyScripts,
  injectScripts
};
