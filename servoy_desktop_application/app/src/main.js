const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");
const url = require("url");

let win;

function createWindow(){
    win = new BrowserWindow({
        width: 1000,
        height: 800,
        frame: true,
        resizable: true,
        show: false,
        webPreferences: {
          javascript: true,
          plugins: true,
          nodeIntegration:false,
          preload: path.resolve(path.join(__dirname, 'preload/preload.js'))
        }
    });
    win.loadURL("http://localhost:8080/solutions/ElectronSample/index.html?f=Main");
    win.webContents.on('did-finish-load', function() {
      win.show();
    });
    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    })
}

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin' || process.platform !== 'win32'){
        app.quit();
    }
});

app.on('ready', createWindow);
