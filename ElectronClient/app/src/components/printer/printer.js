filename = process.argv[2] || __filename;
const {dialog} = require('electron');
const printer = require('printer');

/**
* This function prints text to a printer
* @param {JSON Object}
*/
function printText(object){
  printer.printDirect({
        data: object.text,
        printer: object.printer,
        type: "RAW",
        success: function(jobId){
               console.log("Succesfully sent to printer with ID: "+ jobId);
	      },
        error: function(err){
          switch(err.name){
            case 'TypeError':
              dialog.showErrorBox('Printer Error', ' Printer ' + object.printer + ' is not connected or does not exist');
            break;
            default:
              dialog.showErrorBox('Error', err);
            break;
          }
        }
  });
}

function printFile(object){
  console.log('platform:', process.platform);
  console.log('try to print file: ' + object.filename);
  if( process.platform != 'win32') {
    printer.printFile({filename:object.filename,
      printer: process.env[3], // printer name, if missing then will print to default printer
      success:function(jobID){
        console.log("sent to printer with ID: "+jobID);
      },
      error:function(err){
        console.log(err);
      }
    });
  } else {
// not yet implemented, use printDirect and text
  var fs = require('fs');
  printer.printDirect({data:fs.readFileSync(filename),
  printer: process.env[3], // printer name, if missing then will print to default printer
  success:function(jobID){
    console.log("sent to printer with ID: "+jobID);
  },
  error:function(err){
    console.log(err);
  }
  });
  }
}

function printPDF(object){
  util = require('util'),
  printerName = 'Foxit Reader PDF Printer',
  printerFormat = 'TEXT';
  printer.printDirect({
  data:object.data, // or simple String: "some text"
	printer:object.printer, // printer name
	type: object.type, // type: RAW, TEXT, PDF, JPEG, .. depends on platform
    options:
    {
        media: object.media,
        'fit-to-page': object.fit
    },
	success:function(jobID){
		success();
	},
	error:function(err){
    console.log(err);
  }
});
}


function successPDF(){
  console.log("sent to printer with ID: "+jobID);
  var jobInfo = printer.getJob(object.printer, jobID);
  console.log("current job info:" + util.inspect(jobInfo, {depth: 10, colors:true}));
  if(jobInfo.status.indexOf('PRINTED') !== -1)
  {
    console.log('too late, already printed');
    return;
    }
    console.log('cancelling...');
    var is_ok = printer.setJob(object.printer, jobID, 'CANCEL');
    console.log("cancelled: "+is_ok);
    try {
         console.log("current job info:" + util.inspect(printer.getJob(printerName, jobID), {depth: 10, colors:true}));
    } catch(err) {
         console.log('job deleted. err:'+err);
  }
}

/*
* This function retrieves a list of all the connected printers
*/
function getPrinters(){
   var printer_list = printer.getPrinters();
   return printer_list;
}

function initIPC(ipcMain){

// Wait for the print-file event
ipcMain.on('print-file', function(event, file_object){
    printFile(file_object);
});

// Wait for the selected_printer event
ipcMain.on('selected-printer', function(event, printer_object) {
     printText(printer_object);
});

// Wait for the get-printers event
ipcMain.on('get-printers', function(event, _placeholder){
    event.sender.send('printer-list', printer.getPrinters());
});
}

module.exports = {
  initIPC
}
