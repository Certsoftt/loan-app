import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NotFound from '../../app/404';

describe('NotFound Page', () => {
  it('renders custom 404 page and navigation options', () => {
    const { getByText } = render(<NotFound />);
    expect(getByText('404')).toBeTruthy();
    expect(getByText('Page Not Found')).toBeTruthy();
    expect(getByText('Go to Home')).toBeTruthy();
    expect(getByText('Go to Login')).toBeTruthy();
    expect(getByText('Go Back')).toBeTruthy();
  });
});
