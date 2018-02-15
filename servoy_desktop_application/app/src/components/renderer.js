
function setIPC(){
    global.ipcRenderer = require('electron').ipcRenderer;
}

module.exports = {
  setIPC
};
