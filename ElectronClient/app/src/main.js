const communication = require('./components/communication');
const mainWindow = require('./components/windows/mainWindow');
const infoWindow = require('./components/windows/infoWindow');
const networkManager = require('./components/managers/networkManager');
const {app, ipcMain, webContents} = require('electron');
const printer = require('./components/printer/printer');
const path = require('path');
const url = require('url');
const fs = require('fs');
const os = require('os');

// if(os.platform() === 'win32') {
//   const powerpointManager = require('./components/managers/office/powerpointManager');
// }
// Define the servoy.json file to get config options
const config_file_path = path.join(__dirname, './config/', 'servoy.json');
// const config_file_path = path.join(__dirname, './../config/', 'servoy.json');
const config = JSON.parse(fs.readFileSync(config_file_path, 'utf8'));
const internet_template = url.format({pathname: path.join(__dirname, './components/static/','internet.html'), protocol: 'file:', slashes: true});

// Declare windows so we can use them.
let window;
let internetWindow;

/*
* Create the main window and load the index file
*/
function create(){
  window = mainWindow.createWindow(config);
  // window.loadURL(url.format({
  //   pathname: path.join(__dirname, 'index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }));
  window.loadURL(config.options.url);
  window.webContents.openDevTools();
}

/*
* Set global variables
*/
function setGlobals(){
  global.url = config.options.url;
  global.title = config.options.title;
  global.internet = internet_template;
}

// Wait for the path_specified event
ipcMain.on('path_specified', function(event, file_path) {
    communication.initPath(file_path);
});

// Wait for the selected_printer event
ipcMain.on('get-url', function(event, _placeholder) {
     event.sender.send('source', config.options.url);
});

ipcMain.on('no-internet', function(event, _placeholder) {
     internetWindow = infoWindow.createWindow("Internet");
});

// Reload the application from renderer process
ipcMain.on('reload', function(event, _placeholder){
     reload();
});

// Quit the app if the application is not on mac or windows when windows are closed
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin' || process.platform !== 'win32'){
        app.quit();
    }
});

/*
* Initialise the global variables and the browser window with config options
* Start IPC functions of features
* createWindow function from components/browserWindow.js
*/
function init(){
    setGlobals();
    networkManager.startNetworkManager();
    printer.initIPC(ipcMain);
    create();

    var presentation = path.join(app.getPath('desktop'), 'test.pptx');
    powerpointManager.open(presentation);
}

// When the app is ready call the init function and call setNetworkEvent
app.on('ready', function() {
  init();
});

/*
* Reload the application when there is a problem
*/
function reload(){
  window = null;
  init();
};
