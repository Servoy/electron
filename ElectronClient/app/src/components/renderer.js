/*
* This function sets a global IPC Renderer so we can use it inside the
* loaded web-application to send IPC events
*/
function setIPC(){
    global.ipcRenderer = require('electron').ipcRenderer;
}

module.exports = {
  setIPC
};
