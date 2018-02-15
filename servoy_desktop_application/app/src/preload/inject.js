const fs = require('fs');
const path = require('path');
const settings = require(__dirname + '/../servoy.json');
const uglify = require('uglify-js');

const INJECT_JS_PATH = path.join(__dirname, '../', 'preload/scripts.js');

function injectScripts() {
  const needToInject = fs.existsSync(INJECT_JS_PATH);
  if (!needToInject) {
    return;
  }
  require(INJECT_JS_PATH);
}

function uglifyScripts(){
  var uglified = uglify.minify(getScripts());
  fs.writeFile('app/src/preload/scripts.js', uglified.code, function (err){
  if(err) {
    console.log(err);
  } else {
    console.log("Scripts combined, minified and saved in:", 'scripts.js');
  }
  });
}

function getScripts(){
  var sources = new Array();
  for(script in settings.injectScripts){
      sources.push(fs.readFileSync(settings.injectScripts[script], 'utf8'));
  }
  return sources;
}

module.exports = {
  uglifyScripts,
  injectScripts
};
