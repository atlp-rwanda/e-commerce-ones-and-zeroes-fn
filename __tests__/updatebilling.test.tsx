import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import UpdateBilling from '../src/views/updatebilling';
import { Store, UnknownAction } from '@reduxjs/toolkit';

// Mock the UpdateBillingAddress component
jest.mock('../src/components/updatebillingaddress', () => () => <div>Update Billing Address</div>);

const mockStore = configureStore([]);

describe('UpdateBilling component', () => {
  let store: MockStoreEnhanced<unknown, {}> | Store<unknown, UnknownAction, unknown>;

  beforeEach(() => {
    store = mockStore({});
  });

  test('renders UpdateBillingAddress component', () => {
    render(
      <Provider store={store}>
        <UpdateBilling />
      </Provider>
    );

    // Check if the UpdateBillingAddress component is rendered
    expect(screen.getByText('Update Billing Address')).toBeInTheDocument();
  });
});
