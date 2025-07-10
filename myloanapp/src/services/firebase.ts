// Firebase configuration and initialization
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: 
  Platform.OS === 'android'
  ? Constants.expoConfig?.extra?.FIREBASE_API_KEY_ANDROID
  : Constants.expoConfig?.extra?.FIREBASE_API_KEY,
  authDomain:
  Platform.OS === 'android'
  ? Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN_ANDROID
  : Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN,
  projectId: Platform.OS === 'android'
  ? Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID_ANDROID
  : Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID,
  storageBucket: 
  Platform.OS === 'android'
  ? Constants.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET_ANDROID
  : Constants.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
  Platform.OS === 'android'
  ? Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_PROJECT_NUMBER
  : Constants.expoConfig?.extra?.FIREBASE_MESSAGING_SENDER_ID,
  appId:
    Platform.OS === 'android'
      ? Constants.expoConfig?.extra?.FIREBASE_APP_ID_ANDROID
      : Constants.expoConfig?.extra?.FIREBASE_APP_ID,
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = getAuth(app); // Remove persistence config for web/Expo
const db = getFirestore(app);

export { app, auth, db };
