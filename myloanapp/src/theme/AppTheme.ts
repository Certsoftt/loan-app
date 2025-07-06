// Theme setup for modern, clean design with dark mode support
import { MD3LightTheme as DefaultTheme, MD3DarkTheme as DarkTheme } from 'react-native-paper';

export const LightAppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2E7D32', // Green for loan approval
    secondary: '#1565C0', // Blue for actions
    error: '#D32F2F', // Red for rejected
    background: '#F5F5F5',
    surface: '#FFFFFF',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onError: '#FFFFFF',
    pending: '#FFB300', // Amber for pending
    flagged: '#F57C00', // Orange for flagged
  },
};

export const DarkAppTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#81C784',
    secondary: '#90CAF9',
    error: '#EF9A9A',
    background: '#121212',
    surface: '#1E1E1E',
    onPrimary: '#121212',
    onSecondary: '#121212',
    onError: '#121212',
    pending: '#FFD54F',
    flagged: '#FFB74D',
  },
};
