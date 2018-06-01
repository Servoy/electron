# Angular Service Creation in Servoy

For making Electron work with a solution created with the Servoy Developer, an Angular Service needs to be created inside the solution. In this manual, all the steps for creating the Angular Service for Electron will be shown. To give the community the option to create additional features this manual will give an impression on how to make the communication work from the side of the solution.

## Sending Information


### Step 1.

Navigate to the Web Packages header in the Solution Explorer, which is stated under the current solution. Right click and you will see some options. Select “create service package project”.

![ScreenShot](/tutorial-images/sending-information/1.png)

Now an interface comes up. Fill in the name of the service project and the display name of the service project. Additionally, you can give a version and select which solutions need to include the new service project. For now we just select the servoy_training solution.

![ScreenShot](/tutorial-images/sending-information/2.png)

Now under Web Packages the new service project is listed. In this case we called it “ElectronService”. Right click this service project and the option to create a new service will come up. Click on it. 

![ScreenShot](/tutorial-images/sending-information/3.png)

Provide the name of the service you want to create. For now we just simply call it electron

![ScreenShot](/tutorial-images/sending-information/4.png)


### Step 2.

Now the service “electron” is created. With the creation of this service, two files are generated, which you can see in the left bottom of figure. A JavaScript file and a specification file. Click on “electron.js”.

![ScreenShot](/tutorial-images/sending-information/5.png)

In the electron.js file we see that there exists generated code, which is an angular module with a factory service. Inside the factory service we can use the ipcRenderer of Electron because it is injected globally from the Electron framework. We don’t have to define it. 

![ScreenShot](/tutorial-images/sending-information/6.png)

Inside the return statement we can create new functions. Let’s replace the “helloworld” function from figure with the “sendToPrinter function” from figure . Inside this function we use the send function of the ipcRenderer. The named pipe is “selected-printer”. In Electron there needs to exist an on function with the same named pipe. This function will handle the action of the attached printer. 

![ScreenShot](/tutorial-images/sending-information/7.png)

To use the function “sendToPrinter” we have to specify it in the generated specification file “electron.spec”. This specification is a json file. Let’s replace the helloworld function with its parameter in figure with the sendToPrinter function with its parameters like in figure .

![ScreenShot](/tutorial-images/sending-information/8.png)

![ScreenShot](/tutorial-images/sending-information/9.png)


### Step 3.

Now navigate to a form where you want the implementation of sending a message to the printer. Right click on the form and select Open in Form Editor. 

![ScreenShot](/tutorial-images/sending-information/10.png)

To use the function to send a message to the printer we use a simple button. Let’s call it print hello. Add an onAction event to the created button.

![ScreenShot](/tutorial-images/sending-information/11.png)

We have to specify a name for the event method. Let’s call it onActionPrint. 

![ScreenShot](/tutorial-images/sending-information/12.png)

Now navigate to Open in Script Editor. As you can see in figure , the function onActionPrint exists inside the script. Here we can simply call the function from the Angular service by writing. 

```javascript
plugins.electron.sendToPrinter(“TestPrinter”, “Hello”)
```
This is done with code completion. 

![ScreenShot](/tutorial-images/sending-information/13.png)

![ScreenShot](/tutorial-images/sending-information/14.png)


## Retrieving information

To understand how retrieving information from Electron works you should first read on how the implementation of sending information is done because these steps will go further after the creation of an Angular Service. Retrieving information from Electron needs a bit of adjustment of the generated JavaScript file in the Angular Service. How it works will be shown in the steps below. 


### Step 1.

In the Angular Service we first have to change the factory service. We have to include the $q component so that we can wait for a callback of Electron. 

We create a function to request some information from Electron. Let’s call this function retrievePrinters. In this function we declare a variable deferred with the defer function of the $q component as value. This is needed to wait for a response of Electron. 

Then after we use the send function of the ipcRenderer to request a list of the attached printers of the local machine from Electron. 

Electron will then send back the list of printers as an object through the named pipe: “printer-list”. To pick this up we use the on function of the ipcRenderer. Inside we use the resolve function of the deferred to pick up the value of the callback “printer_list”. After it is resolved we return the promise to the script of the chosen form. 

![ScreenShot](/tutorial-images/retrieving-information/1.png)

Inside the specification file we have to add the function again. This time we have to specify its return function as an object. Since Electron will send it back as an object.

![ScreenShot](/tutorial-images/retrieving-information/2.png)


### Step 2.

In step 3 of sending information, we now replace the print hello button with a Retrieve Printers button in the form we chose. We also add a combobox with a custom valuelist. Let’s call this valuelist “printerlist”.  


![ScreenShot](/tutorial-images/retrieving-information/3.png)

Now we have to add an onAction event again. Let’s call this event onActionRetrievePrinters

![ScreenShot](/tutorial-images/retrieving-information/4.png)

Inside the onActionRetrievePrinters function we first create an Array printerList. Then we call the retrievePrinters function from the Angular service to get the printers from Electron. After we do a for-loop to get all the printers from the json object and add it to the printerList Array and fill the valuelist “printerlist”.

![ScreenShot](/tutorial-images/retrieving-information/5.png)


### Step 3.

When we load the application inside Electron, we click on the retrieve printers button to retrieve a list of all the printers. Now the combobox is filled with the attached printers of the local machine like in figure .

![ScreenShot](/tutorial-images/retrieving-information/6.png)
