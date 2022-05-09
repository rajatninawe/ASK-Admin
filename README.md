## Angular Starter Kit for Firebase Web App

After that,\
Create a Firebase project and register your app.\
        Before you can add Firebase to your JavaScript app, you need to create a Firebase project and register your app with that project. When you register your app with                 Firebase, you'll get a Firebase configuration object that you'll use to connect your app with your Firebase project resources.
        
After you have a Firebase project, you can register your web app with that project.
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

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
