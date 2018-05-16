const communication = require('./components/communication');
const mainWindow = require('./components/windows/mainWindow');
const infoWindow = require('./components/windows/infoWindow');
const networkManager = require('./components/managers/networkManager');
const powerpointManager = require('./components/officeManagers/powerpointManager');
const {app, ipcMain, webContents} = require('electron');
const printer = require('./components/printer/printer');
const fs = require('fs');
const path = require('path');
const url = require('url');

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
  window.loadURL(url.format({
  pathname: path.join(__dirname, 'index.html'),
  protocol: 'file:',
  slashes: true
  }));
  window.webContents.openDevTools();
}

/*
* Call the networkManager to see what the network status is. This is handled
* to log the internet speed of the end user.
*/
function setNetworkEvent(){
  const time = networkManager.minToMs(1);
  networkManager.networkStatus({
    timeoutMs: time,
    intervalMs: time,
    hostname: 'google.com',
    address: '8.8.8.8'
  }).on('latencies', ({dns, ping}) => {
    console.log('ping: ' + ping);
    console.log('dns: ' + dns);
  });
};

/*
* Initialise the global variables and the browser window with config options
* Show the openDevTools for debugging
* createWindow function from components/browserWindow.js
*/
function init(){
    global.url = config.options.url;
    global.title = config.options.title;
    global.internet = internet_template;
    var presentation_path = path.join(app.getPath('desktop'), 'it_applied_engineering_presentation_dion_haneveld_lifi.pptx');
    powerpointManager.open(presentation_path);
    create();
}

/*
* Reload the application when there is a problem
*/
function reload(){
  window = null;
  init();
};

// Wait for the path_specified event
ipcMain.on('path_specified', function(event, file_path) {
    communication.initPath(file_path);
});

// Wait for the selected_printer event
ipcMain.on('selected-printer', function(event, printer_object) {
     printer.printText(printer_object);
});

// Wait for the selected_printer event
ipcMain.on('get-url', function(event, _placeholder) {
     event.sender.send('source', config.options.url);
});

ipcMain.on('no-internet', function(event, _placeholder) {
     internetWindow = infoWindow.createWindow("Internet");
});

// Wait for the get-printers event
ipcMain.on('get-printers', function(event, _placeholder){
    event.sender.send('printer-list', printer.getPrinters());
});

// Wait for the print-file event
ipcMain.on('print-file', function(event, file_object){
     printer.printFile(file_object);
});

ipcMain.on('reload', function(event, _placeholder){
     reload();
});

// Quit the app if the application is not on mac or windows when windows are closed
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin' || process.platform !== 'win32'){
        app.quit();
    }
});

// When the app is ready call the init function and call setNetworkEvent
app.on('ready', function() {
  init();
  setNetworkEvent();
});
