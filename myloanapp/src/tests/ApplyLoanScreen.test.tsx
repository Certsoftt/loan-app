import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ApplyLoanScreen from '../screens/ApplyLoanScreen';

describe('ApplyLoanScreen', () => {
  it('shows error for invalid amount', async () => {
    const { getByText, getByLabelText } = render(<ApplyLoanScreen navigation={{ goBack: jest.fn() }} />);
    fireEvent.changeText(getByLabelText('Loan Amount'), 'abc');
    fireEvent.press(getByText('Submit'));
    await waitFor(() => getByText('Enter a valid amount'));
  });

  it('shows error for empty purpose', async () => {
    const { getByText, getByLabelText } = render(<ApplyLoanScreen navigation={{ goBack: jest.fn() }} />);
    fireEvent.changeText(getByLabelText('Loan Amount'), '1000');
    fireEvent.changeText(getByLabelText('Purpose'), '');
    fireEvent.press(getByText('Submit'));
    await waitFor(() => getByText('Purpose is required'));
  });
});
