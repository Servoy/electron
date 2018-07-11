const {BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

function createWindow(title){
    var window = new BrowserWindow({
        width: 800,
        height: 600,
        title: title
    });
    window.loadURL(url.format({
      pathname: path.join(__dirname, './../file-explorer/', 'file-explorer.html'),
      protocol: 'file:',
      slashes: true
    }));

    window.webContents.on('did-finish-load', function() {
      window.openDevTools();
      window.show();
    });

    window.on('closed', () => {
      window = null;
    });
    return window;
};

module.exports = {
  createWindow
}
