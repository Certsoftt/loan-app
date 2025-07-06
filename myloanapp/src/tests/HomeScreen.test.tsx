import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';

describe('HomeScreen', () => {
  it('shows offline warning when offline', async () => {
    const { getByText } = render(<HomeScreen navigation={{ navigate: jest.fn() }} />);
    // Simulate offline state
    await waitFor(() => getByText(/offline/i));
  });
});
