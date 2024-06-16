import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store';
import Login from '../../src/Pages/Login/Login';
import { loginUser } from '../../src/redux/slices/loginSlice';

const mockStore = configureStore([]);

jest.mock('../../src/components/Toast/Toast', () => ({
    __esModule: true,
    default: jest.fn((props) => (
      <div data-testid="toast">{props.message}</div>
    )),
  }));

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  }));

jest.mock('../../src/redux/slices/loginSlice', () => ({
    loginUser: jest.fn(() => ({ type: 'loginUser' })),
}));

describe('Login component', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore({
            login: {
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
                <Router>
                    <Login />
                </Router>
            </Provider>
        );
        expect(getByText('Login into your account')).toBeInTheDocument();
    });


    it('dispatches loginuser action on valid form submission', async () => {
        store.dispatch = jest.fn();
        
        const { getByLabelText, getByText } = render(
            <Provider store={store}>
                <Router> 
                    <Login />
                </Router>
            </Provider>
        );
    
        fireEvent.change(getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(getByLabelText('Password'), { target: { value: 'StrongPass1!' } });
        fireEvent.click(getByText('Login'));
    
        await waitFor(() => {
            expect(store.dispatch).toHaveBeenCalledWith(loginUser({
                email: 'john.doe@example.com',
                password: 'StrongPass1!',
            }));
        });
    });

    it('It should display error on invalid submisstion', async () => {
        store.dispatch = jest.fn();
        
        const { getByLabelText, getByText } = render(
            <Provider store={store}>
            <Router> 
                <Login />
            </Router>
        </Provider>
        );
    
        fireEvent.change(getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(getByLabelText('Password'), { target: { value: 'StrongP' } });
        fireEvent.click(getByText('Login'));
    
        expect(getByText('Password is not strong')).toBeInTheDocument();

    });
       
});
