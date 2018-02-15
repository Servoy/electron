const {ipcRenderer, webFrame} = require('electron');
const path = require('path');
const renderer = require('./../components/renderer');
const inject = require('./../preload/inject');
const settings = require(__dirname + '/../servoy.json');
const proc = require("process");


function loadScripts(){
  renderer.setIPC();
  inject.uglifyScripts();
  inject.injectScripts();
}

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
    loadScripts();
});
