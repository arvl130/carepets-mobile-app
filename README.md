# CarePets Mobile App

Pet care service appointments scheduling mobile application. The goal is to take care of your pets!

To download our application, click [here](https://github.com/arvl130/carepets-mobile-app/releases/download/download-here/CarePets-2023-05-02-1.apk).

## Setup for Development

This app based on the [Ionic Framework](https://ionicframework.com). To setup for
development, install the latest version of the [Node.js](https://nodejs.org/en).

You will also need a text editor like [VS Code](https://code.visualstudio.com/) or
[Sublime Text](https://www.sublimetext.com/).

1. Extract the project ZIP file and open the folder with your preferred text editor.

2. Run the following command on the Terminal to install the Ionic CLI.

```sh
npm i -g @ionic/cli
```

3. Next, install the project dependencies:

```sh
npm install
```

3. Run the following command to start the project:

```sh
ionic serve
```

A web browser should appear previewing the mobile application.

## Setup for Building

To setup for building, you will need to follow the steps above. After you have
completed those, you have to install the SDK for your target platform.

For Android, you will need to install [Android Studio](https://developer.android.com/studio/install) with the Android SDK.

For iOS, you will need to install [Xcode](https://developer.apple.com/xcode) on a computer running macOS.

To generate Android and iOS projects, run the command below:

```sh
ionic capacitor build
```

Open the generated projects on Android Studio and/or Xcode and build the application
using the provided mechanism of those platforms.
