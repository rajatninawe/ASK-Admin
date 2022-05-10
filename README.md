## Angular Starter Kit for Firebase Web App

The Angular Starter Kit for Firebase Web App implements the connection between various commomly used firebase services and a angular based admin protal. The purpose of this is to provide user friendy access to various firebase services.

The following is the list of services implemented currently:
- Firestore Database
- Storage
- Topic based Cloud Messaging

### Prerequisites

#### Node.js
Before you can start working, you need to have Node.js installed on your machine.\
To download Node.js visit https://nodejs.org/en/download/.

*NOTE: You can use a tool like NVM or N to install and manage multiple node versions*

#### Angular CLI

You use the Angular CLI to create projects, generate application and library code, and perform a variety of ongoing development tasks such as testing, bundling, and deployment.

To install the Angular CLI, open a terminal window and run the following command:

    npm install -g @angular/cli

#### Firebase Project
Before you can add Firebase to your app, you need to create a Firebase project and register your app with that project. When you register your app with Firebase, you'll get a Firebase configuration object that you'll use to connect your app with your Firebase project resources.
In the center of the Firebase console's project overview page, click the Web icon (plat_web) to launch the setup workflow.
If you've already added an app to your Firebase project, click Add app to display the platform options.
Enter your app's nickname.
This nickname is an internal, convenience identifier and is only visible to you in the Firebase console.
Click Register app.
Under SDK setup and configuration, choose config toggle and copy the displayed object there something like this -

    apiKey: "############",
    authDomain: "############",
    projectId: "############",
    storageBucket: "############",
    messagingSenderId: "############",
    appId: "############",
    measurementId: "############",
            
Paste the copied object in firebase key inside environment file.

    export const environment = {
      production: false,
        firebase: {
          apiKey: "############",
          authDomain: "############",
          projectId: "############",
          storageBucket: "############",
          messagingSenderId: "############",
          appId: "############",
          measurementId: "############"
         },
       };
For topic based Push notifications, go to cloud messaging in project settings and copy server key to paste inside same enviornment file under serverKey variable.

    export const serverKey = "############";
              
#### ASK Schematics Generator

Use ASK Schematics Generator to generate new components.

To install the Angular CLI, open a terminal window and run the following command:

    npm i ask-schematics-generator
    
## Code scaffolding

Run `ng g ask-schematics-generator:ask component-name` to generate a new component.

This command will generate a set of following files:
- Parent component (app/pages)\
  This is the base compnent where the collection records will be visible.
- Entry component (app/pages/new-component-name)\
  This will be component used for add/edit records to collection.
- Service file (app/pages/shared/services)\
  Contains the connection details with a particular collection and can be used to connect to other firebase services.
- Model file (app/pages/shared/model)\
  Defines the logical structure and relationship of underlying collection.
  
After generating component, make sure to add the necessary navigation details into layouts.component.ts (src/app/layouts) & and route detail in pages-routing.module.ts (src/app/pages).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
