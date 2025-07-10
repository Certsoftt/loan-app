import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Constants from 'expo-constants';

// Helper to get the correct client ID based on platform
export const getGoogleClientId = () => {
  if (Constants.executionEnvironment === Constants.ExecutionEnvironment.StoreClient) {
    // Expo Go
    return process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID;
  }
  if (Constants.platform?.ios) {
    return process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;
  }
  if (Constants.platform?.android) {
    return process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID;
  }
  return undefined;
};

export const configureGoogleSignIn = () => {
  const clientId = getGoogleClientId();
  if (clientId) {
    GoogleSignin.configure({
      webClientId: clientId, // For Firebase Auth
      iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
      androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
      forceCodeForRefreshToken: true,
    });
  }
};
