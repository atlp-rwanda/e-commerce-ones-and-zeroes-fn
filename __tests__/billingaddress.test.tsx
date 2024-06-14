// BillingAddress.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import BillingAddress from '../src/components/billingaddress';
import { BrowserRouter } from 'react-router-dom';
import { RootState } from '../src/redux/store';
import { AnyAction } from 'redux';
import { format } from 'date-fns';




jest.mock('../src/redux/slices/userSlices', () => ({
  fetchUser: jest.fn(() => ({ type: 'FETCH_USER' })),
}));
// Mock formatDate function for testing
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, 'dd/MM/yyyy');
};
describe('BillingAddress component', () => {
  const mockStore = configureMockStore();

  let store: any;

  beforeEach(() => {
    store = mockStore({
      user: {
        user: {
          firstName: 'John',
          role: 'User',
        },
        loading: false,
        error: null,
      },
    });
  });

  test('renders BillingAddress component', () => {
    store = mockStore({
      user: {
        user: { firstName: 'John', role: 'buyer' },
      },
    });
  
    const { container } = render(
     
        <Provider store={store}>
          <BrowserRouter>
            <BillingAddress />
          </BrowserRouter>
        </Provider>
    
    );
  
    console.log('Rendered HTML:', container.innerHTML);
    expect(container).toBeInTheDocument();
    expect(screen.getByText('2. Billing Address')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });
  test('formatDate function formats date correctly', () => {
    const input = '2023-06-18T12:34:56Z';
    const expectedOutput = '18/06/2023';
    expect(formatDate(input)).toBe(expectedOutput);
  });
  // test('renders BillingAddress component', () => {
  //   render(
  //     <Provider store={store}>
  //       <BrowserRouter>
  //         <BillingAddress />
  //       </BrowserRouter>
  //     </Provider>
  //   );

  //   expect(screen.getByText('2. Billing Address')).toBeInTheDocument();
  //   expect(screen.getByText('Edit')).toBeInTheDocument();
  // });

  test('displays loading indicator when loading', () => {
    store = mockStore({
      user: {
        user: null,
        loading: true,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BillingAddress />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays error message on error', () => {
    store = mockStore({
      user: {
        user: null,
        loading: false,
        error: { message: 'Failed to fetch user data' },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BillingAddress />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Error:Failed to fetch user data')).toBeInTheDocument();
  });
});
