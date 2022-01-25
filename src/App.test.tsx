import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Simple verification of successful start of the app', () => {
  render(<App />);
  const element = screen.getByText('NTNU');
  expect(element).toBeInTheDocument();
});
