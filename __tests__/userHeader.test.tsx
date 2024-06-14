// UserHeader.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import UserHeader from '../src/components/UserHeader'
import { fetchUser } from '../src/redux/slices/userSlices'
import configureMockStore from 'redux-mock-store';


interface RootState {
  user: {
    user: {
      firstName: string;
      role: string;
    };
  };
}
jest.mock('../src/redux/slices/userSlices', () => ({
  fetchUser: jest.fn((id) => ({ type: 'FETCH_USER', payload: id })),
}));
jest.mock('../src/assets/images/logo.jpg', () => 'mock-logo-path');



describe('UserHeader component', () => {
  const mockStore = configureMockStore();
  let store: any;
 
  beforeEach(() => {
    store = mockStore({
      user: {
        user: { firstName: 'John', role: 'buyer' },
      },
    });
  });
  test('renders UserHeader component', () => {
    store = mockStore({
      user: {
        user: { firstName: 'John', role: 'buyer' },
      },
    });
  
    const { container } = render(
     
        <Provider store={store}>
          <BrowserRouter>
            <UserHeader />
          </BrowserRouter>
        </Provider>
    
    );
  
    console.log('Rendered HTML:', container.innerHTML);
    expect(container).toBeInTheDocument();
  });
  test('renders Header component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserHeader />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByAltText('Account')).toBeInTheDocument();
    expect(screen.getByText('OnesAndZeros')).toBeInTheDocument();
  });

  test('toggles account visibility on click', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserHeader />
        </BrowserRouter>
      </Provider>
    );

    const accountButton = screen.getByAltText('Account');
    fireEvent.click(accountButton);

    // Wait for the DOM to update after clicking
    await waitFor(() => {
      expect(screen.getByText('Hello,')).toBeInTheDocument();
      expect(screen.getByText('John')).toBeInTheDocument();
      
      // Use getAllByText to find all elements with the text "MyAccount"
      const myAccountElements = screen.getAllByText('MyAccount');
      expect(myAccountElements.length).toBe(2); // Ensure there are exactly 2 elements

      // Check for specific elements by their role or text content
      const myAccountLink = screen.getByRole('link', { name: /MyAccount/ });
      expect(myAccountLink).toBeInTheDocument();

      const myAccountHeading = myAccountElements.find(
        (element) => element.tagName === 'H4'
      );
      expect(myAccountHeading).toBeInTheDocument();

      expect(screen.getByText('Sign Out')).toBeInTheDocument();
    });
  });

  test('renders Start Buying button', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserHeader />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Start Buying')).toBeInTheDocument();
  });
  test('fetches user data using id', () => {
    const store = mockStore({
      user: {
        user: { firstName: 'John' }
      }
    });
  
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserHeader />
        </BrowserRouter>
      </Provider>
    );
  
    expect(screen.getByText('Hello,')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
  });
});


