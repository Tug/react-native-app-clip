# react-native-app-clip

Expo Config Plugin that generates an App Clip for iOS apps built with Expo.

> **Warning** This plugin is work in progress and doesn't work reliably yet. I only made the repository public to gather feedback and ask for help. Don't use this plugin in production yet!

## Installation

Install it in your project:

```
expo install react-native-app-clip
```

In your app's Expo config (app.json, or app.config.js), add react-native-app-clip to the list of plugins:

```app.json
"expo": {
    "name": "my app",
    "plugins": [
        ["react-native-app-clip", { "entryPoint": "index.appclip.js", "name": "RN App Clip" }]
    ]
}
```

## Configuration

Specifying the entryPoint parameter is optional, it defaults to "index.appclip.js". This means that the App Clip expects a file called index.appclip.js in the project's root directory. You can change this value to "index.js" in order to reuse the existing entrypoint of the Expo app which basically means the App Clip experience will be exactly the same as the full app experience. In most cases however it will make sense to have a separate entrypoint which only renders a subset of the app's capabilities as the App Cip experience.

## Before building for the App Store

Please note that you need to register a new App ID for the App Clip in your Apple Developer profile. Under "Certificates, Identifiers & Profiles", go to "Indetifiers," click on the plus icon and select "App IDs" to create a new App ID. Select "App Clip" as the type and on the next screen select your main app as the "Parent App ID" and enter Clip as the product name (it is important that the product name is exactly "Clip" and nothing else. At the bottom of the page, Apple shows a preview of the App Clip Bundle ID. If your main app's bundle ID is com.example.my-app, the App Clip Bundle ID should now be com.example.my-app.Clip.

## How to test the App Clip

App Clips can not be tested with Expo Go or expo-dev-client. The best two ways to test the App Clip seem to be the following:

### Build App Clip with Xcode and open on a connected device

Run `expo prebuild -p ios` (see https://docs.expo.dev/workflow/expo-cli/#expo-prebuild) in your Expo project folder to generate the ios folder with all native sources. Then open the file `ios/my-app.xcworkspace` (with my-app being your app's name) in Xcode. In your project, you should find two targets, one named like your app (e.g. "my-app") and one with a "Clip" suffix (e.g. "my-appClip"). For both targets, selected a team in the "Signing & Capabilities" tab and make sure a signing certificate is selected by Xcode. Then using the menu bar select "Product", followed by "Scheme", where you should see two themes listes at the bottom of the menu window that are named after the two targets. Selected the scheme that ends with "Clip". Now you can build and run the App Clip (using the menu bar via "Product" followed by "Run" or using the shortcut ⌘R).

### Build for production using EAS Build and test via Testflight
