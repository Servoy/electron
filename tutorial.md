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
