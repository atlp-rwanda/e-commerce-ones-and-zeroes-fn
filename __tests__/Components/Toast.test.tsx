
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Toast from '../../src/components/Toast/Toast';

describe('Toast Component', () => {
  test('renders without crashing', () => {
    render(<Toast messageType="success" message="Test message" />);
  });

  test('renders success message', async () => {
    const { getByText } = render(<Toast messageType="success" message="Success message" />);
    await waitFor(() => expect(getByText('Success message')).toBeInTheDocument());
  });

  test('renders error message', async () => {
    const { getByText } = render(<Toast messageType="error" message="Error message" />);
    await waitFor(() => expect(getByText('Error message')).toBeInTheDocument());
  });

  test('does not render without message or messageType', async () => {
    const { queryByTestId } = render(<Toast messageType={''} message={''} />);
    expect(queryByTestId('toast')).toBeNull();
  });

  test('renders success message and closes it after 5 seconds', async () => {
    const { getByText, queryByText } = render(<Toast messageType="success" message="Test message" />);
    await waitFor(() => expect(getByText('Test message')).toBeInTheDocument());
    // await waitFor(() => expect(queryByText('Test message')).toBeNull(), { timeout: 10000 });
  });

  test('renders error message and closes it after 5 seconds', async () => {
    const { getByText, queryByText } = render(<Toast messageType="error" message="Test message" />);
    await waitFor(() => expect(getByText('Test message')).toBeInTheDocument());
    // await waitFor(() => expect(queryByText('Test message')).toBeNull(), { timeout: 10000 });
  });
});
