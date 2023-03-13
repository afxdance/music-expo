# Music App - Expo 
The current version of the music app. Using Expo greatly streamlines the onboarding process! 

## Getting Started 
* Create an account with Expo: https://expo.dev/
* Login to expo from your laptop: https://docs.expo.dev/get-started/installation/
* Download Expo Go from the app store on your phone
* Pull the code from https://github.com/afxdance/music-expo onto your computer
* Install dependencies: `npm install`

## Running the App 
* Start the app: `npx expo start`
* Take a picture of the QR code using your phone camera. The app should load onto your phone.

## Onboarding 
Looking at these files (in order) should give you a general sense of how the app works:
* `App.tsx`: Main file containing the visual layout of the app and its state. 
* `styles.tsx`: Contains the CSS styles used throughout the app. Imported by `App.tsx`.
* `components/PlayPause/PlayPauseButton.tsx`: An example component which uses the [Expo Audio API](https://docs.expo.dev/versions/v48.0.0/sdk/audio/) to play and pause sound.