# Loan Management Mobile App

A cross-platform (iOS & Android) mobile app for managing loan applications, built with React Native (Expo), TypeScript, and Firebase/Firestore. The app supports authentication, loan application, loan status tracking, offline-first features, push notifications, and a modern, accessible UI.

## Features
- **Authentication:** 
Email/password, Google sign-in, email verification, and biometric login (Face ID/Touch ID).

- **Loan Management:** 
View, apply for, and track the status of loans (pending, approved, rejected, flagged for review).

- **Offline Support:** 
Create loans offline, cache them locally, and sync to Firestore when back online. Displays both cached and mock/sample loans when offline.

- **Push Notifications:** 
Integrated with Expo Notifications for real-time updates.

- **UI/UX:** 
Modern, responsive, accessible design with dark mode, color-coded status badges, and clear feedback (snackbar/toast).

- **Automated Tests:** Example tests for validation and offline features.

## Project Structure
```
myloanapp/
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

### 1. Prerequisites
- Node.js (LTS recommended)
- Expo CLI (`npm install -g expo-cli`)
- A Firebase project (see below)

- Clone this repository
```sh
git clone https://github.com/certsoftt/loan-app.git
```

- Rename `eas.json` to `eas.js`

### 2. Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Register a web app and copy the config values.
3. Enable Authentication (Email/Password, Google) and Firestore Database.

### 3. Expo Dev setup
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
   - give your project a name. Then visit the project using the provided url. You can find them at `https://expo.dev/accounts/[account]/projects/[project]`. Copy your `slug`, `project_id`, and `owner`and use them as values to `PROJECT_SLUG`, `EAS_PROJECT_ID`, and `OWNER`.
   - This process will create an `eas.json` file and register your project with Expo.
   - During this process, Expo will generate a new EAS project ID and link it to your project.

5. Copy the content of `eas.js` and replace it with the content of your generated `eas.json` file.
   - Update your `env` property object in the `eas.json` to your own project setting. Current setting is:
   ```json
      "env": {
        "EXPO_PUBLIC_APP_ENV": "development",
        "EXPO_PUBLIC_EAS_PROJECT_ID": "55a6eed1-0a57-4415-a452-247f1c98651d",
        "EXPO_PUBLIC_PROJECT_SLUG": "myloanapp",
        "EXPO_PUBLIC_OWNER": "makemorer",
        "EXPO_PUBLIC_APP_NAME": "myloanapp"
      },
   ```

6. Setup your Environment variables for `production`, `preview`, and `developemnt` environments on Expo Dev Using your `.env.local.example` to create the `Name`(s) of the variables. You can find the environment variables page at `https://expo.dev/accounts/[account]/projects/[project]/environment-variables`.


### 4. Install Dependencies
```sh
yarn install
```

### 5. Build the App
```sh
eas build --profile development --platform android
or
eas build --profile development --platform ios
```
Scan the QR code To run the app on real device.

### 6. Run the App
```sh
npx expo start
```
Scan the QR code with the real device where the app had been installed in order to launch the app.

### 7. Submit the App Production Build (optional)
```sh
eas submit --platform android
eas submit --platform ios
```
### 8. Running Tests
```sh
npm test
```
---
For questions or contributions, open an issue or pull request!
