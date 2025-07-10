import React from 'react';
import { View, StyleSheet, useWindowDimensions, Platform } from 'react-native';
import { Text, Switch, Card, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeContext } from '../context/ThemeContext';

const LoanDetailsScreen = ({ route }: any) => {
  const { width } = useWindowDimensions();
  const { theme, toggleTheme, paperTheme } = useThemeContext();
  const loan = route?.params?.loan || {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: paperTheme.colors.background }} edges={Platform.OS === 'ios' ? ['top', 'left', 'right'] : ['top', 'bottom', 'left', 'right']}>
      <View style={[styles.container, { paddingHorizontal: width * 0.04 }]}> {/* Responsive padding */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Text variant="headlineMedium" style={styles.title}>Loan Details</Text>
          <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
        </View>
        <Card style={{ marginBottom: 16 }}>
          <Card.Content>
            <Text variant="titleMedium">Amount:</Text>
            <Text style={{ marginBottom: 8 }}>{loan.amount ?? 'N/A'}</Text>
            <Divider />
            <Text variant="titleMedium">Status:</Text>
            <Text style={{ marginBottom: 8 }}>{loan.status ?? 'N/A'}</Text>
            <Divider />
            <Text variant="titleMedium">Date Applied:</Text>
            <Text style={{ marginBottom: 8 }}>{loan.dateApplied ?? 'N/A'}</Text>
            <Divider />
            <Text variant="titleMedium">Loan ID:</Text>
            <Text style={{ marginBottom: 8 }}>{loan.id ?? 'N/A'}</Text>
            <Divider />
            {/* Add more fields as needed */}
            {loan.notes && (
              <>
                <Text variant="titleMedium">Notes:</Text>
                <Text style={{ marginBottom: 8 }}>{loan.notes}</Text>
                <Divider />
              </>
            )}
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default LoanDetailsScreen;
