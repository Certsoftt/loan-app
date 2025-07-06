import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { auth } from '../services/firebase';
import { sendEmailVerification, reload } from 'firebase/auth';

interface EmailVerificationProps {
  navigation: any;
}

const EmailVerificationScreen: React.FC<EmailVerificationProps> = ({ navigation }) => {
  const handleResend = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
  };

  const handleCheck = async () => {
    if (auth.currentUser) {
      await reload(auth.currentUser);
      if (auth.currentUser.emailVerified) {
        navigation.replace('Home');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Verify Your Email</Text>
      <Text style={styles.text}>A verification link has been sent to your email address. Please verify your email to continue.</Text>
      <Button mode="contained" style={styles.button} onPress={handleCheck}>
        I have verified
      </Button>
      <Button style={styles.button} onPress={handleResend}>
        Resend Email
      </Button>
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
  text: {
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
  },
});

export default EmailVerificationScreen;
