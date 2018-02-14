const {app, BrowserWindow} = require("electron");
const path = require("path");
const url = require("url");

let win;

function createWindow(){

    win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: true,
        resizable: true,
        show: false,
        webPreferences: {
          javascript: true,
          plugins: true,
          // node globals causes problems with sites like messenger.com
          nodeIntegration:false,
          preload: path.resolve(path.join(__dirname, 'preload/preload.js'))
        }
    });

    // win.loadURL(url.format({
    //     pathname: path.join(__dirname, "index.html"),
    //     protocol: "file",
    //     slashes: true
    // }));
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
