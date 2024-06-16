import React from 'react';
import { render, screen } from '@testing-library/react';
import UserVerificationFailed from '../../src/components/IsVerifiedModal/UserVerificationFailed';

describe('UserVerificationFailed Component', () => {
  test('renders correctly', () => {
    render(<UserVerificationFailed />);

    expect(screen.getByAltText('')).toBeInTheDocument();

    expect(screen.getByText('Your verrification process was not successfully')).toBeInTheDocument();

    expect(screen.getByText('Go in your email and click verify button again.')).toBeInTheDocument();
    expect(screen.getByText(/If this problem persist , Please contact us on email/)).toBeInTheDocument();
  });
});
