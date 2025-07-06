import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { auth } from '../services/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

interface SignupProps {
  navigation: any;
}

const SignupScreen: React.FC<SignupProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setError('Invalid email format');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    setError('');
    return true;
  };

  const handleSignup = async () => {
    if (!validate()) return;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        await sendEmailVerification(userCredential.user);
        navigation.replace('EmailVerification');
      } else {
        navigation.replace('Home');
      }
    } catch (e: any) {
      setError(e.message || 'Signup failed');
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await GoogleSignin.hasPlayServices?.();
      const userInfo = await GoogleSignin.signIn?.();
      // idToken is on userInfo.idToken for web/Expo
      const googleCredential = GoogleAuthProvider.credential(userInfo?.idToken);
      await signInWithCredential(auth, googleCredential);
      navigation.replace('Home');
    } catch (e: any) {
      setError(e.message || 'Google signup failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Sign Up</Text>
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
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <HelperText type="error" visible={!!error}>{error}</HelperText>
      <Button mode="contained" onPress={handleSignup} style={styles.button}>Sign Up</Button>
      <Button onPress={handleGoogleSignup} mode="contained" style={styles.button}>Sign Up with Google</Button>
      <Button onPress={() => navigation.navigate('Login')}>Already have an account? Login</Button>
    </View>
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

export default SignupScreen;
