// UserHeader.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import Modal from '../src/components/modal'
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
  fetchUser: jest.fn(),
}));



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
            <Modal children={undefined} onClose={function (): void {
              throw new Error('Function not implemented.');
            } } />
          </BrowserRouter>
        </Provider>
     
    );
  
    console.log('Rendered HTML:', container.innerHTML);
    expect(container).toBeInTheDocument();
  });
  
  
});


