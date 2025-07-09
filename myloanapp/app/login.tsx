import React from 'react';
import LoginScreen from '../src/screens/LoginScreen';

export default function Login() {
  return <LoginScreen navigation={{ navigate: () => {}, replace: () => {} }} />;
}
