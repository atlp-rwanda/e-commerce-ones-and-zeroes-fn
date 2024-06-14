import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UpdatePerson from '../src/components/updateperson'; // Adjust the path as per your project structure
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { RootState } from '../src/redux/store';
import { updateUser } from '../src/redux/slices/userSlices';
import { toast } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';


const mockStore = configureMockStore([])

describe('UpdatePerson Component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      user: {
        user: {
          userId: '1234',
          firstName: 'John',
          lastName: 'Doe',
          gender: 'male',
          birthdate: '1990-01-01',
          preferredLanguage: 'English',
          preferredCurrency: 'USD',
          billingAddress: '123 Main St',
          createdAt: '2023-01-01',
          updatedAt: '2023-01-02',
          isActive: true,
          isGoogle: false,
          isVerified: true,
          email: 'john.doe@example.com',
          role: 'buyer',
          password: 'hashedPassword',
          passwordLastChanged: '2023-01-01',
        },
        loading: false,
        error: null,
      },
    });
  });

  test('renders UpdatePerson component with user data', () => {
    render(
      <Provider store={store}>
         <BrowserRouter>
          <UpdatePerson />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByLabelText('First Name')).toHaveValue('John');
    expect(screen.getByLabelText('Last Name')).toHaveValue('Doe');
    expect(screen.getByLabelText('Sex')).toHaveValue('male');
    expect(screen.getByLabelText('BirthDate(mm-dd-yy)')).toHaveValue('1990-01-01');
    expect(screen.getByLabelText('Preferred Language')).toHaveValue('English');
    expect(screen.getByLabelText('Preferred Currency')).toHaveValue('USD');
    expect(screen.getByLabelText('Current Address')).toHaveValue('123 Main St');
  });

  test('updates user information on form submission', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UpdatePerson />
        </BrowserRouter>
      </Provider>
    );

     // Mock toast success function
     const mockToastSuccess = jest.fn();

     // Replace toast.success with the mock function
     jest.spyOn(toast, 'success').mockImplementation(mockToastSuccess);

    // Mock the updateUser action
    const mockUpdateUser = jest.spyOn(store, 'dispatch');
    mockUpdateUser.mockImplementation(() => Promise.resolve()); // Mocking dispatch to return a resolved promise

    // Simulate changes in input fields
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Smith' } });

    // Submit the form
    fireEvent.submit(screen.getByRole('button', { name: 'UPDATE' }));

    // Wait for async actions to complete
    await waitFor(() => {
      // Verify updateUser was dispatched with correct payload
      expect(mockUpdateUser).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'user/updateUser/pending',
          payload: {
            id: '1234',
            user: {
              userId: '1234',
              firstName: 'Jane',
              lastName: 'Smith',
              gender: 'male',
              birthdate: '1990-01-01',
              preferredLanguage: 'English',
              preferredCurrency: 'USD',
              billingAddress: '123 Main St',
              email: '',
            },
          },
        })
      );

      // Verify success toast was called
      expect(toast.success).toHaveBeenCalledWith('User updated successfully!');
    });
  });

  test('formats date correctly on date change', () => {
    render(
      <Provider store={store}>
         <BrowserRouter>
          <UpdatePerson />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('BirthDate(mm-dd-yy)'), { target: { value: '2020-05-15' } });

    expect(screen.getByLabelText('BirthDate(mm-dd-yy)')).toHaveValue('2020-05-15');
  });
});
