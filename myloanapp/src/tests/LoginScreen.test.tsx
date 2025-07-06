import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import LoginScreen from '../screens/LoginScreen';

describe('LoginScreen', () => {
  it('shows error for invalid email', async () => {
    const { getByText, getByLabelText } = render(<LoginScreen navigation={{ navigate: jest.fn() }} />);
    fireEvent.changeText(getByLabelText('Email'), 'invalid');
    fireEvent.press(getByText('Login'));
    await waitFor(() => getByText('Invalid email format'));
  });

  it('shows error for empty password', async () => {
    const { getByText, getByLabelText } = render(<LoginScreen navigation={{ navigate: jest.fn() }} />);
    fireEvent.changeText(getByLabelText('Email'), 'test@example.com');
    fireEvent.press(getByText('Login'));
    await waitFor(() => getByText('Password is required'));
  });
});
