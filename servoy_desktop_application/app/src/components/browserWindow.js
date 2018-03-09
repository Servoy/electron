const communication = require('./communication');
const {BrowserWindow} = require("electron");
const path = require("path");

/**
* Create the browser window ;
* Uses the preload.js file to inject some scripts
* @param {{}} config from servoy.json
*/
function createWindow(config){
    const options = Object.assign({}, config.options);
    var window = new BrowserWindow({
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
          preload: path.resolve(path.join(__dirname, './../preload/preload.js'))
        }
    });
    // When the contents are loaded set the download listener and show the window
    window.webContents.on('did-finish-load', function() {
      communication.setDownloadListener(window);
      window.show();
    });
    // When the window is closed set the window to null;
    window.on('closed', () => {
      window = null;
    });
    return window;
};

module.exports = {
  createWindow
}
