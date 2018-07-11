const fileExplorerWindow = require('./../windows/fileExplorerWindow');

function initIPC(ipcMain){

ipcMain.on('startFileExplorer', function(event, _placeholder){
    explorerWindow = fileExplorerWindow.createWindow("File Explorer");
});
};

module.exports = {
  initIPC
}
