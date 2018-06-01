const communication = require('./../communication');
const {BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
var window = null;
/**
* Create the browser window;
* Uses the preload.js file to inject some scripts
* @param {{}} config options from servoy.json
*/
function createWindow(config){
    const options = Object.assign({}, config.options);
    window = new BrowserWindow({
        width: config.options.width,
        height: config.options.height,
        frame: config.options.frame,
        title: config.options.title,
        resizable: config.options.resizable,
        show: config.options.show,
        webPreferences: {
          javascript: config.options.webPreferences.javascript,
          plugins: config.options.webPreferences.plugins,
          nodeIntegration:config.options.webPreferences.nodeIntegration,
          preload: path.resolve(path.join(__dirname, './../../preload/preload.js'))
        }
    });
    window.ipcRenderer = BrowserWindow.ipcRenderer;
    window.source = config.options.url;
    // When the contents are loaded set the download listener and show the window
    loadListener();
    // When the window is closed set the window to null;
    window.on('closed', () => {
      window = null;
    });
    return window;
};

function loadListener(){
  window.webContents.on('did-finish-load', function() {
    communication.setDownloadListener(window);
    window.show();
  });
  window.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL, isMainFrame) => {
    if (errorDescription === 'ERR_INTERNET_DISCONNECTED') {
      console.log(errorDescription);
      window.loadURL(url.format({
      pathname: path.join(__dirname, './../static/internet.html'),
      protocol: 'file:',
      slashes: true
      }));
    }
  });
}

module.exports = {
  createWindow
}
