import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const LoanDetailsScreen = ({ route }: any) => {
  // TODO: Display full loan info from route.params
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Loan Details</Text>
      {/* TODO: Show loan details */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

export default LoanDetailsScreen;
