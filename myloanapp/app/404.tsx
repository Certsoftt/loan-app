import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';

export default function NotFound() {
  const router = useRouter();

  // Log the not found event (could be sent to analytics)
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn('NotFound page hit:', window.location?.href);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>404</Text>
      <Text variant="titleMedium" style={styles.subtitle}>Page Not Found</Text>
      <Text style={styles.info}>Sorry, the page you are looking for does not exist.</Text>
      <Button mode="contained" onPress={() => router.replace('/')}>Go to Home</Button>
      <Button mode="outlined" onPress={() => router.replace('/login')} style={styles.button}>Go to Login</Button>
      <Button mode="text" onPress={() => router.back()} style={styles.button}>Go Back</Button>
      <Text style={styles.env}>App Env: {Constants.expoConfig?.extra?.EXPO_PUBLIC_APP_ENV || 'N/A'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 16,
    color: '#333',
  },
  info: {
    marginBottom: 24,
    color: '#757575',
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
  },
  env: {
    marginTop: 32,
    color: '#90A4AE',
    fontSize: 12,
  },
});
