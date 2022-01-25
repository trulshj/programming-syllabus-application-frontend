import React from 'react';
import { render, screen } from '@testing-library/react';
import LoggInn from './LoggInn';

test('Simple verification of successful render of Logginn component', () => {
    render(<LoggInn />);
    const element = screen.getByText('Passord');
    expect(element).toBeInTheDocument();
});
