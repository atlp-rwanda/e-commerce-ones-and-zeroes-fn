import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Signup from '../../src/Pages/Signup/Signup';
import { signupUser } from '../../src/redux/slices/SignupSlice';
import '@testing-library/jest-dom'; 

const mockStore = configureStore([]);

jest.mock('../../src/components/Toast/Toast', () => ({
    __esModule: true,
    default: jest.fn((props) => (
      <div data-testid="toast">{props.message}</div>
    )),
  }));

jest.mock('../../src/redux/slices/signupSlice', () => ({
    signupUser: jest.fn(() => ({ type: 'signupUser' })),
}));

describe('Signup component', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore({
            signup: {
                loading: false,
                isSucceeded: false,
                userInfo: null,
                error: null,
            },
        });
    });

    it('renders without crashing', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Signup />
            </Provider>
        );
        expect(getByText('Create new account')).toBeInTheDocument();
    });

    it('dispatches signupUser action on valid form submission', async () => {
        store.dispatch = jest.fn();
        
        const { getByLabelText, getByText } = render(
            <Provider store={store}>
                <Signup />
            </Provider>
        );
    
        fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
        fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });
        fireEvent.change(getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(getByLabelText('Password'), { target: { value: 'StrongPass1!' } });
        fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'StrongPass1!' } });
        fireEvent.click(getByText('Sign Up'));
    
        await waitFor(() => {
            expect(store.dispatch).toHaveBeenCalledWith(signupUser({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: 'StrongPass1!',
            }));
        });
    });
    it('It should display error on invalid submisstion', async () => {
        store.dispatch = jest.fn();
        
        const { getByLabelText, getByText } = render(
            <Provider store={store}>
                <Signup />
            </Provider>
        );
    
        fireEvent.change(getByLabelText('First Name'), { target: { value: ' ' } });
        fireEvent.change(getByLabelText('Last Name'), { target: { value: ' ' } });
        fireEvent.change(getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(getByLabelText('Password'), { target: { value: 'StrongP' } });
        fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'StrongPa' } });
        fireEvent.click(getByText('Sign Up'));
    
        expect(getByText('First name is required')).toBeInTheDocument();
        expect(getByText('Last name is required')).toBeInTheDocument();
        expect(getByText('Password is not strong')).toBeInTheDocument();

    });
    it('It should display error on invalid submisstion req', async () => {
        store.dispatch = jest.fn();
        
        const { getByLabelText, getByText } = render(
            <Provider store={store}>
                <Signup />
            </Provider>
        );
    
        fireEvent.change(getByLabelText('First Name'), { target: { value: ' ' } });
        fireEvent.change(getByLabelText('Last Name'), { target: { value: ' ' } });
        fireEvent.change(getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(getByLabelText('Password'), { target: { value: ' ' } });
        fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'StrongPa' } });
        fireEvent.click(getByText('Sign Up'));
    
        expect(getByText('First name is required')).toBeInTheDocument();
        expect(getByText('Last name is required')).toBeInTheDocument();
        expect(getByText('Password is required')).toBeInTheDocument();

    });
    
    it('shows spinner when loading', () => {
        store = mockStore({
            signup: {
                loading: true,
                isSucceeded: false,
                userInfo: null,
                error: null,
            },
        });

        const { getByText } = render(
            <Provider store={store}>
                <Signup />
            </Provider>
        );

        expect(getByText('Processing...')).toBeInTheDocument();
    });

    it('shows success message on successful signup', () => {
        store = mockStore({
            signup: {
                loading: false,
                isSucceeded: true,
                userInfo: { message: 'Signup successful!' },
                error: null,
            },
        });

        const { getByText } = render(
            <Provider store={store}>
                <Signup />
            </Provider>
        );

        expect(getByText('Signup successful! Go and check your email to veify your account')).toBeInTheDocument();
    });

    it('shows error message on signup failure', () => {
        store = mockStore({
            signup: {
                loading: false,
                isSucceeded: false,
                userInfo: null,
                error: { message: 'Signup failed!' },
            },
        });

        const { getByText } = render(
            <Provider store={store}>
                <Signup />
            </Provider>
        );

        expect(getByText('Signup failed!')).toBeInTheDocument();
    });

    it('resets form inputs after successful registration', async () => {
        store = mockStore({
            signup: {
                loading: false,
                isSucceeded: false,
                userInfo: null,
                error: null,
            },
        });

        const { getByLabelText, getByText } = render(
            <Provider store={store}>
                <Signup />
            </Provider>
        );
    
        fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
        fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });
        fireEvent.change(getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(getByLabelText('Password'), { target: { value: 'StrongPass1!' } });
        fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'StrongPass1!' } });
        fireEvent.click(getByText('Sign Up'));

        store = mockStore({
            signup: {
                loading: false,
                isSucceeded: true,
                userInfo: { message: 'Signup successful!' },
                error: null,
            },
        });

        await waitFor(() => {
            const { getByLabelText } = render(
                <Provider store={store}>
                    <Signup />
                </Provider>
            );
            
           
        });
    });

   
});
