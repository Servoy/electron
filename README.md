[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues) [![Known Vulnerabilities](https://snyk.io/test/github/DionDavid/electron/badge.svg?targetFile=ElectronClient/app/package.json)](https://snyk.io/test/github/DionDavid/electron) [![Maintainability](https://api.codeclimate.com/v1/badges/482ffb25e5b4c5bc17f8/maintainability)](https://codeclimate.com/github/DionDavid/electron/maintainability) [![dependencies Status](https://david-dm.org/DionDavid/electron/status.svg?path=ElectronClient/app)](https://david-dm.org/DionDavid/electron?path=ElectronClient/app) 

All the badges are tested against app inside the ElectronClient

# Electron Client for Servoy

This client is made for the possibility of using the NG-Client with access to the local functionalities of the operating system.

<a href="url"><img src="https://raw.githubusercontent.com/wiki/DionDavid/electron/images/home.jpg" height="400" width="650" ></a>

## Table of Contents 

  - [Setup](#setup)
    - [Prerequisites](#prerequisites)
      - [For further development of Microsoft Office integration](#for-further-development-of-microsoft-office-integration)
  - [Usage](#usage)
    - [Creating the executable](#creating-the-executable)
      - [Apache Ant](#apache-ant)
      - [Loading your solution](#loading-your-solution)
      - [Changing app icon](#changing-app-icon)
      - [packaging the application](#packaging-the-application)
      - [How is the packaging done?](#how-is-the-packaging-done)
  - [How to create features for the Servoy Electron Client?](#how-to-create-features-for-the-servoy-electron-client)

## Setup

The setup for further local development of the Servoy Electron Client.

### Prerequisites

Make sure you have Node.js, Python 2.x, installed on your system. Windows users will also require Visual Studio

[Python](https://www.python.org/downloads/) 

[Node.js](https://nodejs.org/en/) >= 7

[Visual Studio](https://www.visualstudio.com/vs/)


#### For further development of Microsoft Office integration

Please send an email to [dhaneveld@servoy.com](mailto:dhaneveld@servoy.com) to get the .NET project and information on how you can further improve it.

## Usage

### Creating the executable

For creating an executable on your local machine for local development you have to do the following:

#### Apache Ant

The process of creating an executable is done with [Apache Ant](https://ant.apache.org/manual/install.html). For MacOS I recommend installing Apache Ant with [Homebrew](https://brew.sh/index_nl).

This project consists of an build.xml file where you can edit the settings of creating an executable. 

#### Loading your solution

To load in your solution made with the Servoy Developer there are several things to do:

1. Check your local IP address

   - On Windows open up a command prompt and type **ipconfig**.
   - On Mac and Linux open up a terminal and type **ifconfig**.

2. Now head over to the build.xml 

   - Replace the value of the property url with the url of your application
   - Example: http://192.168.43.197:8080/solutions/ElectronSample/index.html?f=Main
   
3. Don't have a solution or electron web package? 

   - import the ServoyExample and the electron web package from this repository.

#### Changing app icon

If you wish to change the icon for your local development installation you have to do the following:

  - Navigate to **electron/ElectronClient/app/resources/icons/** | add your icon here.
  - Navigate to **electron/ElectronClient/app/config/servoy.json** | replace with the name of your icon

#### packaging the application

First you can choose for what platform and arch type you want to create your application.
Navigate to the build.xml and do the following:

   - Replace the value of the property platform with the following options: --platform windows, --platform darwin, --platform linux
   - Replace the value of the property arch with the following options: --arch=x64, --arch=ia32

run the following command in your command prompt or terminal to package the application: 

```console
ant run.electron
```
#### How is the packaging done?

To package the application a CLI program is included inside the ElectronClient. 

It resides inside **electron/ElectronClient/lib** and has the following architecture:

<a href="url"><img src="https://raw.githubusercontent.com/wiki/DionDavid/electron/images/architecture.jpg" height="400" width="650" ></a>



## How to create features for the Servoy Electron Client?

To create new features for the Client there is a tutorial on explaining how you can do this











