// UserHeader.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter, Router } from 'react-router-dom';
import PersonalInfo from '../src/components/personalInfo/personalInfo'
import { fetchUser } from '../src/redux/slices/userSlices'
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';


interface RootState {
  user: {
    user: {
      firstName: string,
      lastName: string,
      email: string,
      gender: string,
      birthdate: string,
      preferredLanguage: string,
      preferredCurrency: string,
      billingAddress: string,
      createdAt:string,
      role: string,
      passwordLastChanged: string,
      updatedAt: string,
    };
    loading:boolean;
    error:boolean
  };
}
const mockStore = configureMockStore();


jest.mock('../src/redux/slices/userSlices', () => ({
  fetchUser: jest.fn(),
}));

jest.mock("../assets/images/bg.png", () => 'mock-logo-path');
const initialState: RootState = {
  user: {
    user: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      gender: 'Male',
      birthdate: '1990-01-01T00:00:00Z',
      preferredLanguage: 'English',
      preferredCurrency: 'USD',
      billingAddress: '123 Main St',
      createdAt: '2022-01-01T00:00:00Z',
      role: 'User',
      passwordLastChanged: '2022-02-01T00:00:00Z',
      updatedAt: '2022-03-01T00:00:00Z',
    },
    loading: false,
    error: false,
  },
};

describe('UserHeader component', () => {
  const store = mockStore(initialState);
 
  // beforeEach(() => {
  //   store = mockStore({
  //     user: {
  //       user: { firstName: 'John', role: 'buyer' },
  //     },
  //   });
  // });
  test('renders UserHeader component', () => {
    // store = mockStore({
    //   user: {
    //     user: { firstName: 'John', role: 'buyer' },
    //   },
    // });
  
    const { container } = render(
     
        <Provider store={store}>
          <BrowserRouter>
            <PersonalInfo />
          </BrowserRouter>
        </Provider>
      
    );
  
    console.log('Rendered HTML:', container.innerHTML);
    expect(container).toBeInTheDocument();
  });
  test('renders PersonalInfo component', async () => {
    render(
      <Provider store={store}>
         <MemoryRouter>
          <PersonalInfo />
        </MemoryRouter>
      </Provider>
    );

    // Check if the personal information is displayed correctly
    expect(screen.getByText('1.Personal Information')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('01/01/1990')).toBeInTheDocument(); // Formatted birthdate
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    expect(screen.getByText('01/01/2022')).toBeInTheDocument(); // Formatted createdAt
    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText('01/02/2022')).toBeInTheDocument(); // Formatted passwordLastChanged
    expect(screen.getByText('01/03/2022')).toBeInTheDocument(); // Formatted updatedAt
// Test the modal functionality
fireEvent.click(screen.getByText(/edit/i));
await waitFor(() => {
  // Look for a component that is rendered by UpdateProfile
  expect(screen.getByTestId('UpdatePerson')).toBeInTheDocument();
});

// fireEvent.click(screen.getByText(/close/i));
// await waitFor(() => {
//   expect(screen.queryByTestId('UpdatePerson')).not.toBeInTheDocument();
// });
});
  
});


