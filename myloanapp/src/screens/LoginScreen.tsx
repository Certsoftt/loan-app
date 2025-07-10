import React, { useState } from 'react';
import { View, StyleSheet, useWindowDimensions, Platform } from 'react-native';
import { TextInput, Button, Text, HelperText, Switch } from 'react-native-paper';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import * as LocalAuthentication from 'expo-local-authentication';
import NetInfo from '@react-native-community/netinfo';
import { logEvent } from '../services/log';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { configureGoogleSignIn } from '../services/authConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeContext } from '../context/ThemeContext';

interface LoginProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const { theme, toggleTheme, paperTheme } = useThemeContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isOffline, setIsOffline] = useState(false);
  const [resetMsg, setResetMsg] = useState('');
  const [resetting, setResetting] = useState(false);

  React.useEffect(() => {
    configureGoogleSignIn();
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  const validate = () => {
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setError('Invalid email format');
      return false;
    }
    if (!password) {
      setError('Password is required');
      return false;
    }
    setError('');
    return true;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    if (isOffline) {
      logEvent('offline_login', { email });
      // Show offline mode message and create mock session
      setError('You are in offline mode, using mock data.');
      // Simulate login and navigate to Home
      setTimeout(() => {
        setError('');
        navigation.replace('Home');
      }, 1000);
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Home');
    } catch (e: any) {
      setError(e.message || 'Login failed');
      logEvent('login_failed', { email, error: e.message });
    }
  };

  const handleBiometricLogin = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!hasHardware || !isEnrolled) {
        setError('Biometric authentication not available');
        return;
      }
      const result = await LocalAuthentication.authenticateAsync({ promptMessage: 'Login with Biometrics' });
      if (result.success) {
        // Optionally, retrieve stored credentials or navigate to Home
        navigation.replace('Home');
      } else {
        setError('Biometric authentication failed');
      }
    } catch (e: any) {
      setError(e.message || 'Biometric login failed');
    }
  };

  const handleForgotPassword = async () => {
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setError('Enter a valid email to reset password');
      return;
    }
    setResetting(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMsg('Password reset email sent! Please check your inbox.');
      logEvent('password_reset_requested', { email });
    } catch (e: any) {
      setError(e.message || 'Failed to send reset email');
      logEvent('password_reset_failed', { email, error: e.message });
    } finally {
      setResetting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      // idToken is on userInfo.idToken for web/Expo
      const { idToken } = await GoogleSignin.getTokens();
      if (!idToken) {
        setError('Google sign-in failed: No ID token received');
        return;
      }
      // Use idToken to authenticate with Firebase
      const googleCredential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, googleCredential);
      navigation.replace('Home');
    } catch (error: any) {
      setError('Google sign-in failed');
      logEvent('google_signin_failed', { error: error?.message });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: paperTheme.colors.background }} edges={Platform.OS === 'ios' ? ['top', 'left', 'right'] : ['top', 'bottom', 'left', 'right']}>
      <View style={[styles.container, { paddingHorizontal: width * 0.04 }]}> {/* Responsive padding */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Text variant="headlineMedium" style={styles.title}>Login</Text>
          <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
        </View>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <HelperText type="error" visible={!!error}>{error}</HelperText>
        {isOffline && (
          <Text style={{ color: '#FFB300', textAlign: 'center', marginBottom: 8 }}>
            You are in offline mode, using mock data.
          </Text>
        )}
        <Button mode="contained" onPress={handleLogin} style={styles.button}>Login</Button>
        <Button onPress={() => navigation.navigate('Signup')}>Don't have an account? Sign Up</Button>
        <Button mode="outlined" onPress={handleBiometricLogin} style={styles.button}>Login with Face ID / Touch ID</Button>
        <Button onPress={handleForgotPassword} mode="text" style={styles.button} loading={resetting} disabled={resetting}>
          Forgot Password?
        </Button>
        <Button mode="outlined" onPress={handleGoogleSignIn} style={styles.button}>
          Sign in with Google
        </Button>
        {!!resetMsg && <HelperText type="info" visible>{resetMsg}</HelperText>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});

export default LoginScreen;
