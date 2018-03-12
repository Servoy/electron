const communication = require('./components/communication');
const browserWindow = require('./components/browserWindow');
const {app, ipcMain, webContents} = require("electron");
const printer = require('./components/printer/printer');
const fs = require('fs');
const path = require("path");
const url = require("url");

// Define the servoy.json file to get config options
const config_file_path = path.join(__dirname, '/config/', 'servoy.json');
const config = JSON.parse(fs.readFileSync(config_file_path, 'utf8'));

// Declare a window so we can use it
let window;

/*
* Initialise the browser window with config options and load the url;
* Show the openDevTools for debugging
* createWindow function from components/browserWindow.js
*/
function init(){
    window = browserWindow.createWindow(config);
    window.loadURL(config.options.url);
    window.webContents.openDevTools();
}

// Wait for the path_specified event
ipcMain.on('path_specified', function(event, file_path) {
    communication.initPath(file_path);
});

// Wait for the selected_printer event
ipcMain.on('selected-printer', function(event, printer_object) {
     printer.printText(printer_object);
});

// Wait for the get-printers event
ipcMain.on('get-printers', function(event, _placeholder){
    event.sender.send('printer-list', printer.getPrinters());
});

// Wait for the print-file event
ipcMain.on('print-file', function(event, file_object){
     printer.printFile(file_object);
});

// Quit the app if the application is not on mac or windows when windows are closed
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin' || process.platform !== 'win32'){
        app.quit();
    }
});

// When the app is ready call the init function
app.on('ready', init);
