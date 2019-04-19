# Quotes React-Native App

An example React-Native app using Firebase as Data-Backend.

<img src="https://raw.githubusercontent.com/thomd/nice-quotes-app/screenshots/screenshot.png" width="50%">

## Setup

First create a [Firebase](https://firebase.google.com) project:

1. Open [Firebase Console](https://console.firebase.google.com/)
2. Click on "Add a Project"
3. Enter project name "Quotes", select Locations and click on "Create Project"
4. Select "Database" Service and click "Create database"
5. Select "Start in test mode" and click "Enable"
6. Select "Project Overview" on top-left, then click on "Add an app to get started" `</>`
7. copy-paste configuration into a file `./firebase.config.js` like this:

```javascript
export default {
   apiKey: '***',
   authDomain: 'quotes-*****.firebaseapp.com',
   databaseURL: 'https://quotes-*****.firebaseio.com',
   projectId: 'quotes-*****',
   storageBucket: 'quotes-*****.appspot.com',
   messagingSenderId: '***'
}
```

Then install [Expo](https://expo.io/) and start project

    npm install -g expo-cli
    expo start

