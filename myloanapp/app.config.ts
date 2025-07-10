import { ConfigContext, ExpoConfig } from "expo/config";
import { version } from "./package.json";
// import 'dotenv/config';

// Replace these with your EAS project ID and project slug.
// You can find them at https://expo.dev/accounts/[account]/projects/[project].
const EAS_PROJECT_ID = process.env.EXPO_PUBLIC_EAS_PROJECT_ID;
const PROJECT_SLUG = process.env.EXPO_PUBLIC_PROJECT_SLUG;
const OWNER = process.env.EXPO_PUBLIC_OWNER;

// App production config
const APP_NAME = process.env.EXPO_PUBLIC_APP_NAME;
const BUNDLE_IDENTIFIER = process.env.EXPO_PUBLIC_BUNDLE_IDENTIFIER;
const PACKAGE_NAME = process.env.EXPO_PUBLIC_PACKAGE_NAME;
const ICON = "./assets/images/icons/ios/iOS-Prod.png";
const ADAPTIVE_ICON = "./assets/images/icons/android/Android-Prod.png";
const SCHEME = "app-scheme";

export default ({ config }: ConfigContext): ExpoConfig => {
  console.log("⚙️ Building app for environment:", process.env.EXPO_PUBLIC_APP_ENV);
  const { bundleIdentifier, icon, adaptiveIcon, packageName, scheme } =
    getDynamicAppConfig(
      (process.env.EXPO_PUBLIC_APP_ENV as "development" | "preview" | "production") ||
        "development"
    );

  return {
    ...config,
    name: PROJECT_SLUG,
    version, // Automatically bump your project version with `npm version patch`, `npm version minor` or `npm version major`.
    slug: PROJECT_SLUG, // Must be consistent across all environments.
    orientation: "default",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    icon: icon,
    scheme: scheme,
    splash: {
      image: './assets/images/splash-icon.jpg',
      imageWidth: 200,
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: bundleIdentifier,
      googleServicesFile: "./GoogleService-Info.plist", // Ensure this file is present in your project root
    },
    android: {
      adaptiveIcon: {
        foregroundImage: adaptiveIcon,
        backgroundColor: "#ffffff",
      },
      package: packageName,
      edgeToEdgeEnabled: true,
      googleServicesFile: "./google-services.json", // Ensure this file is present in your project root
    },
    updates: {
      url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    extra: {
      FIREBASE_API_KEY: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
      eas: {
        projectId: EAS_PROJECT_ID,
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "@react-native-firebase/app", "expo-router"
    ],
    experiments: {
      typedRoutes: true,
    },
    owner: OWNER,
  };
};

// Dynamically configure the app based on the environment.
// Update these placeholders with your actual values.
export const getDynamicAppConfig = (
  environment: "development" | "preview" | "production"
) => {
  if (environment === "production") {
    return {
      name: APP_NAME,
      bundleIdentifier: BUNDLE_IDENTIFIER,
      packageName: PACKAGE_NAME,
      icon: ICON,
      adaptiveIcon: ADAPTIVE_ICON,
      scheme: SCHEME,
    };
  }

  if (environment === "preview") {
    return {
      name: `${APP_NAME} Preview`,
      bundleIdentifier: `${BUNDLE_IDENTIFIER}`,
      packageName: `${PACKAGE_NAME}`,
      icon: "./assets/images/icons/ios/iOS-Prev.png",
      adaptiveIcon: "./assets/images/icons/android/Android-Prev.png",
      scheme: `${SCHEME}-prev`,
    };
  }

  return {
    name: `${APP_NAME} Development`,
    bundleIdentifier: `${BUNDLE_IDENTIFIER}`,
    packageName: `${PACKAGE_NAME}`,
    icon: "./assets/images/icons/ios/iOS-Dev.png",
    adaptiveIcon: "./assets/images/icons/android/Android-Dev.png",
    scheme: `${SCHEME}-dev`,
  };
};
