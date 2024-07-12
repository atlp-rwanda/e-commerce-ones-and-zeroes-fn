import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import UserDash from '../src/views/userDash';
import { Store, UnknownAction } from '@reduxjs/toolkit';

// Mock the Header component
jest.mock('../src/components/UserHeader', () => () => <div>Header Component</div>);

const mockStore = configureStore([]);

describe('UserDash component', () => {
  let store: MockStoreEnhanced<unknown, {}> | Store<unknown, UnknownAction, unknown>;

  beforeEach(() => {
    store = mockStore({});
  });

  test('renders Header component', () => {
    render(
      <Provider store={store}>
        <UserDash />
      </Provider>
    );

    // Check if the Header component is rendered
    expect(screen.getByText('Header Component')).toBeInTheDocument();
  });
});
