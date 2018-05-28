const icongen = require('icon-gen');
const helpers = require('./../helpers/helpers');
const tmp = require('tmp');
const log = require('loglevel');
const path = require('path');
const fs = require('fs');
const pngSizes = [16, 24, 32, 48, 64, 128, 256, 512, 1024];
const Jimp = require("jimp");
const output = getTmpDirPath();
const o = output;
const oSub = o.endsWith('/') ? o + 'icons/' : o + '/icons/';
const PNGoutputDir = oSub + 'png/';

/**
 * Converts an icon from png to icn. If the icon is no png then it converts
 * it to png first. It will fill options.icon.
 * @param inputOptions
 * @param {iconsCallback} callback
*/
function setIcon(inputOptions, callback) {
  const options = Object.assign({}, inputOptions);
  const icon_path = path.join(__dirname, '/../../', options.icon);
  if (!options.icon){
    callback(null, options);
    return;
  }
  createIcons(icon_path, options, callback);
  return;
}

/**
 * Convert the selected icon to all the different sizes.
 * Based on the platform, convert it to different extension with the help of the
 * icongen library
 * If its for Linux just put all the different PNG files into a folder.
 * @callback iconsCallback
 * @param input
 * @param options
*/
function createIcons(input, options, callback) {
  const returnCallback = () => {
    callback(null, options);
  };
  itemsProcessed = 0;
  pngSizes.forEach((item, index, array) => {
    createPNG(input, item, (dest) => {
      itemsProcessed++;
      if(itemsProcessed === array.length) {
        if(options.platform === 'darwin') {
        icongen(PNGoutputDir, oSub + 'mac/', {type: 'png', names: {icns:'icon'}, modes:['icns'], report: true})
        .then((results) => {
          options.icon = oSub + 'mac/icon.icns';
          returnCallback();
        })
        .catch((err) => {
          if (err) throw new Error(err);
        });
      } else if(options.platform === 'win32'){
        icongen(PNGoutputDir, oSub + 'win/', {type: 'png',names: {ico:'icon'}, modes:['ico'], report: true})
        .then((results) => {
          options.icon = oSub + 'win/icon.ico';
          returnCallback();
        })
        .catch( ( err ) => {
          if (err) throw new Error(err);
        });
      } else {
        renamePNGs(0);
        options.icon = oSub + 'png/';
        returnCallback();
      }
      }
    });
  });
}

/**
 * Rename the PNG files for the linux version of Electron.
*/
function renamePNGs(position){
     var startName = pngSizes[position] + '.png';
     var endName = pngSizes[position] + 'x' + pngSizes[position] + '.png';
     fs.rename(PNGoutputDir + startName, PNGoutputDir + endName, function (err) {
         // console.log('Renamed '+ startName + ' to '+endName);
         if (err) {
             throw err;
         } else if (position < pngSizes.length - 1){
             // not done yet. Run the next one
             renamePNGs(position + 1);
         } else {
         }
     });
 }

/**
  * Get the path of the temporary folder.
  * @callback callback
  * @param input
  * @param size
*/
function createPNG(input, size, callback) {
     var fileName = size.toString() + '.png';
     // make dir if does not exist
     if (!fs.existsSync(output)) {
         fs.mkdirSync(output);
     }
     // make sub dir if does not exist
     if (!fs.existsSync(oSub)) {
         fs.mkdirSync(oSub);
     }
     // make dir if does not exist
     if (!fs.existsSync(PNGoutputDir)) {
         fs.mkdirSync(PNGoutputDir);
     }
     Jimp.read(input, function (err, image) {
         if (err) {
             callback(err, null);
         }
         image.resize(size, size)
             .write(PNGoutputDir + fileName, function (err) {
                 var logger = 'Created ' + PNGoutputDir + fileName;
                 callback(PNGoutputDir);
             });
     }).catch(function (err) {
         callback(err, null);
     });
 }

 /**
  * Get the path of the temporary folder.
*/
function getTmpDirPath() {
  const tempIconDirObj = tmp.dirSync({unsafeCleanup: true});
  return tempIconDirObj.name;
}

module.exports = setIcon;
