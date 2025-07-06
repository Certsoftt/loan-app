import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, HelperText, Snackbar } from 'react-native-paper';
import { db, auth } from '../services/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { addLoanOffline } from '../services/offlineLoans';
import NetInfo from '@react-native-community/netinfo';

const ApplyLoanScreen = ({ navigation }: any) => {
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [error, setError] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  const validate = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('Enter a valid amount');
      return false;
    }
    if (!purpose) {
      setError('Purpose is required');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      await addLoanOffline({
        amount: Number(amount),
        purpose,
      });
      setSnackbarMsg('Loan saved offline and will sync when online.');
      setSnackbarVisible(true);
      setAmount('');
      setPurpose('');
      setTimeout(() => navigation.goBack(), 1200);
      return;
    }
    try {
      await addDoc(collection(db, 'loans'), {
        userId: auth.currentUser?.uid,
        amount: Number(amount),
        purpose,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setSnackbarMsg('Loan application submitted!');
      setSnackbarVisible(true);
      setAmount('');
      setPurpose('');
      setTimeout(() => navigation.goBack(), 1200);
    } catch (e: any) {
      setError(e.message || 'Failed to apply for loan');
      setSnackbarMsg('Failed to apply for loan');
      setSnackbarVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Apply for Loan</Text>
      <TextInput
        label="Loan Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
        accessibilityLabel="Loan Amount"
      />
      <TextInput
        label="Purpose"
        value={purpose}
        onChangeText={setPurpose}
        style={styles.input}
        accessibilityLabel="Purpose"
      />
      <HelperText type="error" visible={!!error}>{error}</HelperText>
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>Submit</Button>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={1500}
        accessibilityLiveRegion="polite"
      >
        {snackbarMsg}
      </Snackbar>
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

export default ApplyLoanScreen;
