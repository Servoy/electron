const {BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

function createWindow(title){
    var window = new BrowserWindow({
        width: 500,
        height: 300,
        frame: true,
        title: title,
        resizable: false,
        show: false
    });
    window.loadURL(url.format({
      pathname: path.join(__dirname, './../static/', 'internet.html'),
      protocol: 'file:',
      slashes: true
    }));

    window.webContents.on('did-finish-load', function() {
      // window.openDevTools();
      window.show();
    });

    // When the contents are loaded set the download listener and show the window
    // window.webContents.on('did-finish-load', function() {
    //   window.show();
    // });
    // When the window is closed set the window to null;
    window.on('closed', () => {
      window = null;
    });
    return window;
};

module.exports = {
  createWindow
}
