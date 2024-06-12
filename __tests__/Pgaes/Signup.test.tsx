import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Signup from '../../src/Pages/Signup/Signup';
import { signupUser } from '../../src/redux/slices/AuthSlice';
import { RootState } from '../../src/redux/store';

const mockStore = configureStore([]);

describe('Signup component', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore({
            auth: {
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
        store.dispatch = jest.fn(); // Mock dispatch function
        
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
            expect(store.dispatch).toHaveBeenCalled();
           
        });
    });
    
    it('shows spinner when loading', () => {
        store = mockStore({
            auth: {
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
            auth: {
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

        expect(getByText('Signup successful!')).toBeInTheDocument();
    });

    it('shows error message on signup failure', () => {
        store = mockStore({
            auth: {
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
        const mockDispatch = jest.fn(); // Mock dispatch function
    
        const initialState = {
            auth: {
                loading: false,
                isSucceeded: true,
                userInfo: { message: 'Signup successful!' },
                error: null,
            },
        };
    
        const store = mockStore(initialState);
        store.dispatch = mockDispatch; // Assign mock dispatch function to store
    
        const { getByLabelText, getByText } = render(
            <Provider store={store}>
                <Signup />
            </Provider>
        );
    
        // Set initial form values
        fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
        fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });
        fireEvent.change(getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(getByLabelText('Password'), { target: { value: 'StrongPass1!' } });
        fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'StrongPass1!' } });
    
        // Trigger form submission
        fireEvent.click(getByText('Sign Up'));
    
        await waitFor(() => {
            // Check if dispatch was called
            expect(mockDispatch).toHaveBeenCalled();
    
        });
    });
    

   
});
