# Loan Management Mobile App

A cross-platform (iOS & Android) mobile app for managing loan applications, built with React Native (Expo), TypeScript, and Firebase/Firestore. The app supports authentication, loan application, loan status tracking, offline-first features, push notifications, and a modern, accessible UI.

## Features
- **Authentication:** 
Email/password, Google sign-in, email verification, and biometric login (Face ID/Touch ID). Forgot/Reset Password (firebase)

- **Logging/Analytics:**
A simple logging utility is used to track offline login and password reset attempts. In production, this can be replaced with a full analytics solution (e.g., Firebase Analytics, Sentry).

- **Loan Management:** 
View, apply for, and track the status of loans (pending, approved, rejected, flagged for review).

- **Offline Support:** 
Create loans offline, cache them locally, and sync to Firestore when back online. Displays both cached and mock/sample loans when offline. Offline Mock login.

- **Push Notifications:** 
Integrated with Expo Notifications for real-time updates.

- **UI/UX:** 
Modern, responsive, accessible design with dark mode, color-coded status badges, and clear feedback (snackbar/toast).

- **Automated Tests:** 
Example tests for validation and offline features.

## Project Structure
```
myloanapp/
├── app/                    # Not found expo router component
├── src/
│   ├── components/         # Reusable UI components (no components for now)
│   ├── screens/            # App screens (Login, Signup, Home, ApplyLoan, etc.)
│   ├── navigation/         # Navigation setup
│   ├── services/           # Firebase, notifications, offline, and mock data logic
│   ├── hooks/              # Custom React hooks (no hooks for now)
│   ├── contexts/           # React context providers (no contexts for now)
│   ├── utils/              # Utility functions (no utility functions for now)
│   ├── theme/              # App theming (light/dark)
│   ├── tests/              # Automated tests
│   └── ...
├── App.tsx                # App entry point
├── app.config.ts           # Expo config with env variables
├── .env                   # Environment variables (Firebase config)
└── ...
```


## Key Files/Folders Explained
- **src/services/firebase.ts:** Firebase/Firestore initialization and export.

- **src/services/offlineLoans.ts:** Handles caching of offline loan applications and syncing them to Firestore when online.

- **src/services/mockLoans.ts:** Provides mock/sample loan data for offline demo mode.

- **src/screens/HomeScreen.tsx:** Displays the user's loans. When offline, shows both cached offline loans and mock loans. Syncs cached loans when back online.

- **src/screens/ApplyLoanScreen.tsx:** Lets users apply for a new loan. If offline, uses `addLoanOffline` to cache the loan locally.

- **src/screens/LoginScreen.tsx, SignupScreen.tsx:** Authentication flows, including validation, Google sign-in, and biometrics.

- **src/services/notifications.ts:** Push notification registration and listeners.

- **src/theme/AppTheme.ts:** Light/dark theme and color palette.


### KEY NOTES

- **Are loans created offline cached and synced to Firestore when back online?**<br/>
Yes. When a loan is created offline (via ApplyLoanScreen.tsx), it is cached locally using `addLoanOffline`. In HomeScreen.tsx, when the app detects it is back online, it calls `syncLoansWithFirestore` to upload any cached (unsynced) loans to Firestore.

- **Does the app fetch and display a list of loans from a mock/local JSON file when offline?**<br/>
Yes. When offline, HomeScreen.tsx sets the loan list to the mock data from mockLoans.ts, so users see a sample list even without network connectivity. It also displays cached user-created offline loans.

- **Does app uses native feature?**<br/>
several native features of mobile devices through Expo and React Native libraries. Here are the main native features integrated:

1. **Biometric Authentication**:
 - Uses Expo’s `expo-local-authentication` to access Face ID and Touch ID (native device biometrics).

2. **Push Notifications**:
 - Uses Expo’s `expo-notifications` to register for and receive native push notifications.

3. **Secure Storage**:
 - Uses `@react-native-async-storage/async-storage` for local data caching (native storage API).  - (You can also use expo-secure-store for even more secure token storage if needed.)

4. **Network Status Detection**:
 - Uses `@react-native-community/netinfo` to detect online/offline status (native network info).

5. **Google Sign-In**:
 - Uses `@react-native-google-signin/google-signin` for native Google authentication.


All these features are accessed via cross-platform APIs, so the loan app works natively on both iOS and Android without writing separate native code.


### How the App Works

#### Authentication Flow
✅ Login screen with email/password fields, login button, and validation.

✅ Registration (sign up) with email/password, Google sign-in, and email verification.

✅ Secure token storage via Firebase Auth (Firebase SDK handles token management securely).

✅ Navigation to the home screen after login.


#### Home Screen - Loan List
✅ When online fetches loans from Firestore (per user). When offline fetches and displays both cached user-created offline loans and mock loans in the loan list. 
   - This ensures users see their own offline loan applications as well as example data for a complete experience

✅ Displays loan amount, status (pending, approved, rejected, flagged), and date applied. 

✅ Color-coded status badges for clear visibility. Also visually distinguishes loan list by:
   - Cached user-created offline loans with a bold orange (Offline) label.
   - Mock/sample loans with a gray italic (Sample) label.

✅ Tapping a loan navigates to a details screen with full info.


#### Apply for a New Loan
✅ “Apply for Loan” screen with input fields for amount and purpose.
   - when offline: Loans created offline are cached and synced to Firestore when back online.

✅ Input validation and error/success messages.

✅ Submits to Firestore (simulates POST).

✅ Snackbar/toast feedback is shown after loan submission (success, error, or offline save).


#### UI/UX
✅ Clean, modern, and responsive layout using React Native Paper.

✅ Color-coded badges/icons for loan status.

✅ Smooth navigation with React Navigation.

✅ Pull-to-refresh on the loan list.

✅ Dark mode support via theming.

✅ TypeScript used throughout.

✅ Modular, scalable, and maintainable code structure.


#### Additional Features (Assumptions)
✅ Firebase/Firestore integration for authentication and data.

✅ Biometric login (Face ID/Touch ID).

✅ Push notification integration.

✅ Offline support (basic, with NetInfo).

✅ Automated tests (example for login validation).



## Setup & Running the Project

### A. Prerequisites
- Node.js (LTS recommended)
- Expo CLI (`npm install -g expo-cli`)
- A Firebase project (see below)

- Clone this repository
```sh
git clone https://github.com/certsoftt/loan-app.git
```

- Rename `eas.json` to `eas.js`

- Create `.env.local` file

### B. Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Register a web app and Update your `.env.local` with the config values appropriately
3. Create a new project and register for android, enable firestore database and authentication for email/password and google, then download the `google-services.json`. Update your `.env.local` with the config values appropriately.
4. Create a new project and register for ios, enable firestore database and authentication for email/password and google, then download the `googleservice-info.plist`. Update your `.env.local` with the config values appropriately.
5. Enable Authentication (Email/Password, Google) and Firestore Database for web platform.

#### Note: For enabling google authentication with android platform you have to provide SHA fingerprint. Do the following:
1. Install the JDK:
   - Download and install the latest JDK from:
  https://adoptopenjdk.net/ or https://www.oracle.com/java/technologies/downloads/

2. Add keytool to your PATH:
   - Find where Java is installed (e.g., C:\Program Files\Java\jdk-XX.X.X\bin).  - Add that bin directory to your system’s PATH environment variable.

```
 To add to PATH on Windows:  - Open Start Menu, search for “Environment Variables”, and open “Edit the system environment variables”.  - Click “Environment Variables…”  - Under “System variables”, find and select “Path”, then click “Edit”.  - Click “New” and add the path to your JDK’s bin folder (e.g., C:\Program Files\Java\jdk-XX.X.X\bin).  - Click OK to save.
```

3. Open a new terminal and run:

```sh
keytool -version
```
**If you see the version, keytool is now available.**

4. Run the command on terminal:
```sh
keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android
```
You should see output with lines like:
```sh
SHA1:  12:34:56:78:9A:BC:DE:F0:12:34:56:78:9A:BC:DE:F0:12:34:56:78
SHA256: 12:34:56:78:9A:BC:DE:F0:12:34:56:78:9A:BC:DE:F0:12:34:56:78:12:34:56:78:9A:BC:DE:F0:12:34:56:78
```

5. Copy the SHA1 value and use it in the Firebase Console for Google Sign-In.


#### Google Authentication Setup (Android & iOS)

This project is configured to support Google authentication on both Android and iOS using Firebase. Here’s how it works and how to maintain it:

### 1. Required Files
- **Android:** Place your `google-services.json` file (downloaded from the Firebase Console) in the project root.
- **iOS:** Place your `GoogleService-Info.plist` file (downloaded from the Firebase Console) in the project root.

### 2. Expo Configuration
- In `app.config.ts`, the following fields are set:
  ```ts
  ios: {
    googleServicesFile: "./GoogleService-Info.plist",
    // ...other iOS config
  },
  android: {
    googleServicesFile: "./google-services.json",
    // ...other Android config
  },
  ```
- This ensures EAS Build includes the correct files for each platform.

### 3. Environment Variables
- The `.env.local` file contains platform-specific Firebase credentials:
  - `FIREBASE_API_KEY_ANDROID`, `FIREBASE_APP_ID_ANDROID`, etc. for Android
  - `FIREBASE_API_KEY_IOS`, `FIREBASE_APP_ID_IOS`, etc. for iOS
  - `FIREBASE_API_KEY`, `FIREBASE_APP_ID`, etc. for web/other

### 4. Firebase Initialization
- In `src/services/firebase.ts`, the app dynamically selects the correct credentials based on the platform:
  ```ts
  import { Platform } from 'react-native';
  import Constants from 'expo-constants';
  // ...
  const firebaseConfig = {
    apiKey: Platform.OS === 'android' ? Constants.expoConfig?.extra?.FIREBASE_API_KEY_ANDROID :
           Platform.OS === 'ios' ? Constants.expoConfig?.extra?.FIREBASE_API_KEY_IOS :
           Constants.expoConfig?.extra?.FIREBASE_API_KEY,
    // ...other fields
  };
  ```

### 5. Firebase Console Setup
- In the Firebase Console, register both your Android and iOS apps and download the respective config files.
- For Android, add your SHA1 fingerprint for Google Sign-In support.
- For iOS, use the correct bundle identifier. e.g `com.makemorer.myloanapp`
- Set up OAuth client IDs for both platforms as instructed by Firebase by doing the following:

1. **iOS: Set Up OAuth Client ID**
- Go to the Firebase Console, select your project.
- In the left menu, click the gear icon > Project settings.
- Under Your apps, select your iOS app.
- Make sure your app’s bundle identifier matches your Expo config.
- Scroll to Your apps > iOS app > App nickname and App Store ID (optional, but recommended).
- Download the updated GoogleService-Info.plist and place it in your project as required.

2. **Android: Set Up OAuth Client ID**
- In the Firebase Console, under Project settings, select your Android app.
- Make sure your app’s package name matches your Expo config.
- Under SHA certificate fingerprints, add your app’s SHA-1 and SHA-256 fingerprints (see [how to get these](#note-for-enabling-google-authentication-with-android-platform-you-have-to-provide-sha-fingerprint-do-the-following)).
- Under OAuth 2.0 client IDs, you should see an entry for your Android app. If not:
- Click Add fingerprint or Add OAuth client.
- Enter your app’s package name and SHA-1.
- Download the updated google-services.json and place it in your project as required.

3. **Google Cloud Console: Verify OAuth Consent Screen**
- Go to the Google Cloud Console.
- Make sure you’re in the same project as your Firebase app.
- Under OAuth 2.0 Client IDs, you should see entries for both iOS and Android.
- If needed, configure the OAuth consent screen (add app name, support email, and authorized domains).

4. **Expo/React Native Configuration**
Ensure your app.config.ts or app.json contains the correct bundle identifier (iOS) and package name (Android).
For Google sign-in, use the correct client IDs in your app’s code (see [how to do this](#google-authentication-setup-android--ios)).


### 6. Setting up Expo_Client_ID:

1. Go to the Google Cloud Console for your Firebase web platform project.

2. Find the OAuth 2.0 Client IDs section.

3. Look for a client with the type "Web client".
 - If you don’t see one, you may need to create it:   - Click Create Credentials > OAuth client ID.   - Choose Web application.   - Name it (e.g., "Expo Go Client").   - Under Authorized redirect URIs, add:    - https://auth.expo.io/@your-username/your-app-slug    - Replace `your-username` and `your-app-slug` with your Expo account and project slug.

4. After creating, copy the Client ID (it ends with `.apps.googleusercontent.com`).

5. Paste this value into your .env.local as `EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID.`


### 7. Troubleshooting
- Ensure the config files are present in the project root and referenced correctly in `app.config.ts`.
- Make sure your `.env.local` values match the credentials in the config files.
- If you change your Firebase project or credentials, update both the config files and environment variables.



### C. Expo Dev setup
1. Register on [Expo Dev](https://expo.dev)

2. Install EAS CLI(if not already):
```sh
npm install -g eas-cli
```

3. Log in to Expo using your expo.dev account details<br/>
In your project directory, run:
```sh
eas login
```

4. Initialize EAS in Your Project<br/>
In your project directory, run:
```sh
eas init
```
   - Give your project a name. Then visit the project using the provided url. You can find them at `https://expo.dev/accounts/[account]/projects/[project]`. Copy your `slug`, `project_id`, and `owner`and use them as values to `PROJECT_SLUG`, `EAS_PROJECT_ID`, and `OWNER`.
   - This process will create an `eas.json` file and register your project with Expo.
   - During this process, Expo will generate a new EAS project ID and link it to your project.

5. Copy the content of `eas.js` and replace it with the content of your generated `eas.json` file.
   - Update your `env` property object in the `eas.json` to your own project setting. Current setting is:
   ```json
      "env": {
        "EXPO_PUBLIC_APP_ENV": "development",
        <!-- change this to your expo dev projectID -->
        "EXPO_PUBLIC_EAS_PROJECT_ID": "55a6eed1-0a57-4415-a452-247f1c98651d",
        <!-- change this to your expo dev project slug -->
        "EXPO_PUBLIC_PROJECT_SLUG": "myloanapp",
        <!-- change this to your expo dev project owner -->
        "EXPO_PUBLIC_OWNER": "makemorer",
        <!-- change this to your expo dev project slug -->
        "EXPO_PUBLIC_APP_NAME": "myloanapp",
        <!-- change it to your project com.*****.**** name -->
        "EXPO_PUBLIC_BUNDLE_IDENTIFIER": "com.makemorer.myloanapp",
        <!-- change it to your project com.*****.**** name -->
        "EXPO_PUBLIC_PACKAGE_NAME": "com.makemorer.myloanapp"
      },
   ```

6. Setup your Environment variables for `production`, `preview`, and `developemnt` environments on Expo Dev Using your `.env.local.example` to create the `Name`(s) of the variables. You can find the environment variables page at `https://expo.dev/accounts/[account]/projects/[project]/environment-variables`.


### D. Install Dependencies
```sh
yarn install
or
npm install
```

### E. Build the App
```sh
eas build --profile development --platform android
or
eas build --profile development --platform ios
```
Scan the QR code To run the app on real device.

### F. Run the App
```sh
npx expo start
```
Scan the QR code with the real device where the app had been installed in order to launch the app.

### G. Submit the App Production Build (optional)
```sh
eas submit --platform android
eas submit --platform ios
```
### H. Running Tests (oprional)
```sh
npm test
```
---
For questions or contributions, open an issue or pull request!
