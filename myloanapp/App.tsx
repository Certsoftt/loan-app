import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { registerForPushNotificationsAsync, setUpNotificationListeners } from './src/services/notifications';

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      // Optionally send token to backend or Firestore
      console.log('Expo Push Token:', token);
    });
    setUpNotificationListeners((notification) => {
      // Handle notification received
      console.log('Notification received:', notification);
    });
  }, []);
  return <AppNavigator />;
}
