# Loan Management Mobile App

A cross-platform (iOS & Android) mobile app for managing loan applications, built with React Native (Expo), TypeScript, and Firebase/Firestore. The app supports authentication, loan application, loan status tracking, offline-first features, push notifications, and a modern, accessible UI.

## Features
- **Authentication:** Email/password, Google sign-in, email verification, and biometric login (Face ID/Touch ID).
- **Loan Management:** View, apply for, and track the status of loans (pending, approved, rejected, flagged for review).
- **Offline Support:** Create loans offline, cache them locally, and sync to Firestore when back online. Displays both cached and mock/sample loans when offline.
- **Push Notifications:** Integrated with Expo Notifications for real-time updates.
- **UI/UX:** Modern, responsive, accessible design with dark mode, color-coded status badges, and clear feedback (snackbar/toast).
- **Automated Tests:** Example tests for validation and offline features.

## Project Structure
```
myloanapp/
├── src/
│   ├── components/         # Reusable UI components
│   ├── screens/            # App screens (Login, Signup, Home, ApplyLoan, etc.)
│   ├── navigation/         # Navigation setup
│   ├── services/           # Firebase, notifications, offline, and mock data logic
│   ├── hooks/              # Custom React hooks
│   ├── contexts/           # React context providers
│   ├── utils/              # Utility functions
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

#### Are loans created offline cached and synced to Firestore when back online?
Yes. When a loan is created offline (via ApplyLoanScreen.tsx), it is cached locally using `addLoanOffline`. In HomeScreen.tsx, when the app detects it is back online, it calls `syncLoansWithFirestore` to upload any cached (unsynced) loans to Firestore.

#### Does the app fetch and display a list of loans from a mock/local JSON file when offline?
Yes. When offline, HomeScreen.tsx sets the loan list to the mock data from mockLoans.ts, so users see a sample list even without network connectivity. It also displays cached user-created offline loans.

#### Does app uses native feature?
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


All these features are accessed via cross-platform APIs, so your app works natively on both iOS and Android without writing separate native code.


## Setup & Running the Project

### 1. Prerequisites
- Node.js (LTS recommended)
- Expo CLI (`npm install -g expo-cli`)
- A Firebase project (see below)

### 2. Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Register a web app and copy the config values.
3. Enable Authentication (Email/Password, Google) and Firestore Database.
4. Add your Firebase config to `.env`:
   ```env
   EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

### 3. Install Dependencies
```sh
npm install
```

### 4. Start the App
```sh
npx expo start
```
Scan the QR code with the Expo Go app (iOS/Android) or run on an emulator.

### 5. Running Tests
```sh
npm test
```

## Notes
- The app is fully cross-platform (iOS & Android).
- All sensitive config is managed via environment variables.
- Offline loans are cached and synced automatically.
- Mock/sample data is shown when offline for demo purposes.
- The codebase is modular, scalable, and accessible.

---
For questions or contributions, open an issue or pull request!
