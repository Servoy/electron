const errorMessage = 'The download of {filename} was interrupted';
const progressDownloadItems = () => receivedBytes / totalBytes;
const activeDownloadItems = () => downloadItems.size;
const unusedFilename = require('unused-filename');
const {dialog, app, shell} = require('electron');
const errorTitle = 'Download Error';
const extName = require('ext-name');
const downloadItems = new Set();
const path = require('path');
const pupa = require('pupa');

let directory = "empty";
let completedBytes = 0;
let receivedBytes = 0;
let totalBytes = 0;
let dir = null;
let filePath;

/**
* Sets the directory for the download
* @param {String} path
*/
function initPath(path){
    directory = app.getPath(path);
}

/**
* Listener for when a download happens so we can handle it
* @param {BrowserWindow} window
*/
function setDownloadListener(window){
  window.webContents.session.on('will-download', (event, item, webContents) => {
			checkPath();
			totalBytes += item.getTotalBytes();
			const filename = item.getFilename();
			const name = path.extname(filename) ? filename :
			getFilenameFromMime(filename, item.getMimeType());
	    filePath = unusedFilename.sync(path.join(dir, name));
			item.setSavePath(filePath);
      updated(item)
      done(item);
  });
  }

  function updated(item){
    item.on('updated', () => {
      receivedBytes = [...downloadItems].reduce((receivedBytes, item) => {
          receivedBytes += item.getReceivedBytes();
          console.log(receivedBytes);
          return receivedBytes;
      }, completedBytes);
      app.setBadgeCount(activeDownloadItems());
	    window.setProgressBar(progressDownloadItems());
		});
  }

  function done(item){
    item.on('done', (e, state) => {
      completedBytes += item.getTotalBytes();
      downloadItems.delete(item);
      app.setBadgeCount(activeDownloadItems());
      if (!window.isDestroyed() && !activeDownloadItems()) {
        window.setProgressBar(-1);
        receivedBytes = 0;
        completedBytes = 0;
        totalBytes = 0;
      }
      if (state === 'interrupted') {
        const message = pupa(errorMessage, {filename: item.getFilename()});
          dialog.showErrorBox(errorTitle, message);
      } else if (state === 'completed') {
        console.log("finished");
        if (process.platform === 'darwin') {
          app.dock.downloadFinished(filePath);
        }
        const item_path = path.join(dir, item.getFilename());
        shell.showItemInFolder(item_path);
        shell.openItem(item_path);
      }
    });
  }

	/**
	* Get the filename from download
  * @param {String} name
  * @param {String} mime
  * @return {String}
	*/
	function getFilenameFromMime(name, mime) {
		const exts = extName.mime(mime);
		if (exts.length !== 1) {
			return name;
		}
		return `${name}.${exts[0].ext}`;
	}

	/*
	* This function is to check if the path is set by the developer
	* If not then the user can select the download path from a dialog
	*/
	function checkPath(){
		if(directory !== 'empty') {
			dir = directory;
		} else {
				dialog.showSaveDialog({title:"Select Folder"},
			function(targetPath) {
				if(targetPath !== undefined){
					dir = targetPath;
				} else {
					item.cancel();
				}
			});
		}
	}

module.exports = {
  setDownloadListener,
	initPath
}
