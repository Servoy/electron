const {ipcRenderer, webFrame} = require('electron');
const path = require('path');
const fs = require('fs');
const settings = require(__dirname + '/../servoy.json');
const uglify = require('uglify-js');
const proc = require("process");
const validUrl = require('valid-url');
//
// import {ipcRenderer, webFrame} from 'electron';
// import path from 'path';
// import fs from 'fs';
// import uglify from "uglify-js";
//
const INJECT_JS_PATH = path.join(__dirname, '../', 'preload/inject.js');

function injectScripts() {
  const needToInject = fs.existsSync(INJECT_JS_PATH);
  if (!needToInject) {
    return;
  }
  require(INJECT_JS_PATH);
}

function uglifyScripts(){
  console.log(getScripts());
  var uglified = uglify.minify(getScripts());
  // console.log(uglified);
  fs.writeFile('app/src/preload/inject.js', uglified.code, function (err){
  if(err) {
    console.log(err);
  } else {
    console.log("Script generated and saved:", 'inject.js');
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

// document.addEventListener("DOMNodeInserted", function(event) {
//     if (!!window && !(!!window.$)) {
//         window.$ = window.jQuery = require('path/to/jquery.js');
//     }
// });

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    let targetElement = event.srcElement;
    // the clicked element is the deepest in the DOM, and may not be the <a> bearing the href
    // for example, <a href="..."><span>Google</span></a>
    while (!targetElement.href && targetElement.parentElement) {
      targetElement = targetElement.parentElement;
    }
    const targetHref = targetElement.href;

    if (!targetHref) {
      ipcRenderer.once('contextMenuClosed', () => {
        clickSelector(event.target);
        ipcRenderer.send('cancelNewWindowOverride');
      });
    }
    ipcRenderer.send('contextMenuOpened', targetHref);
  }, false);
  uglifyScripts();
  injectScripts();
});
