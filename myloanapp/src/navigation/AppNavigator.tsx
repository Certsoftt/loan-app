import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider, useThemeContext } from '../context/ThemeContext';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import EmailVerificationScreen from '../screens/EmailVerificationScreen';
import HomeScreen from '../screens/HomeScreen';
import LoanDetailsScreen from '../screens/LoanDetailsScreen';
import ApplyLoanScreen from '../screens/ApplyLoanScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { paperTheme } = useThemeContext();
  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={paperTheme}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LoanDetails" component={LoanDetailsScreen} />
          <Stack.Screen name="ApplyLoan" component={ApplyLoanScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const AppWithThemeProvider = () => (
  <ThemeProvider>
    <AppNavigator />
  </ThemeProvider>
);

export default AppWithThemeProvider;
