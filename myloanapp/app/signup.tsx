import React from 'react';
import SignupScreen from '../src/screens/SignupScreen';

export default function Signup() {
  return <SignupScreen navigation={{ navigate: () => {}, replace: () => {} }} />;
}
