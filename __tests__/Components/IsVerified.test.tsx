import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import IsVerified from '../../src/components/IsVerifiedModal/IsVerified';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('IsVerified component', () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockClear();
  });

  it('renders correctly', () => {
    const { getByText} = render(<IsVerified />);
    expect(getByText('Your email has been successfully verified')).toBeInTheDocument();
    expect(getByText('Click button below to navigate to login page to start using your account')).toBeInTheDocument();
    expect(getByText('Navigate to Login')).toBeInTheDocument();
  });

  it('calls useNavigate when button is clicked', () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    const { getByText } = render(<IsVerified />);
    const button = getByText('Navigate to Login');
    fireEvent.click(button);
    expect(navigateMock).toHaveBeenCalledWith('/login');
  });
});
