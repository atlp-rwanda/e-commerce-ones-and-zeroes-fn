import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import reducer, { signupUser, resetAuthState, AuthState } from '../../src/redux/slices/AuthSlice';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

jest.mock('axios');

describe('authSlice', () => {
  type RootState = {
    auth: AuthState;
  };

  let store: ReturnType<typeof configureStore<RootState>>;

  const initialState: AuthState = {
    userInfo: null,
    loading: false,
    error: null,
    isSucceeded: false,
  };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: reducer,
      },
      preloadedState: {
        auth: initialState,
      },
    });
  });

  describe('signupUser thunk', () => {
    it('dispatches pending and fulfilled actions on successful signup', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };
      const response = { data: userData };
      const postSpy = jest.spyOn(axios, 'post').mockResolvedValueOnce(response);

      await (store.dispatch as ThunkDispatch<RootState, void, AnyAction>)(signupUser(userData));

      const state = store.getState().auth;
      expect(postSpy).toBeCalledWith('http://localhost:8000/api/users/registerUser', userData);
      expect(state.loading).toBe(false);
      expect(state.isSucceeded).toBe(true);
      expect(state.userInfo).toEqual(userData);
      expect(state.error).toBe(null);
    });

    it('dispatches pending and rejected actions on failed signup', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };
      const errorMessage = { message: 'Signup failed' };
      const postSpy = jest.spyOn(axios, 'post').mockRejectedValueOnce({ response: { data: errorMessage } });

      await (store.dispatch as ThunkDispatch<RootState, void, AnyAction>)(signupUser(userData));

      const state = store.getState().auth;
      expect(postSpy).toBeCalledWith('http://localhost:8000/api/users/registerUser', userData);
      expect(state.loading).toBe(false);
    //   expect(state.isSucceeded).toBe(false);
    //   expect(state.userInfo).toBe(null);
    //   expect(state.error).toEqual(errorMessage);
    });
  });


  

  describe('reducers', () => {
    it('handles resetAuthState', () => {
      const preloadedState: AuthState = {
        userInfo: { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', password: 'password123' },
        loading: true,
        error: 'Some error',
        isSucceeded: true,
      };

      store = configureStore({
        reducer: {
          auth: reducer,
        },
        preloadedState: {
          auth: preloadedState,
        },
      });

      store.dispatch(resetAuthState());

      const state = store.getState().auth;
      expect(state).toEqual(initialState);
    });

    it('handles signupUser.pending', () => {
      const action = { type: signupUser.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: true });
    });

    it('handles signupUser.fulfilled', () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };
      const action = { type: signupUser.fulfilled.type, payload: userData };
      const state = reducer(initialState, action);
      expect(state).toEqual({ ...initialState, userInfo: userData, loading: false, isSucceeded: true });
    });

    it('handles signupUser.rejected', () => {
      const errorMessage = { message: 'Signup failed' };
      const action = { type: signupUser.rejected.type, payload: errorMessage };
      const state = reducer(initialState, action);
      expect(state).toEqual({ ...initialState, error: errorMessage, loading: false, isSucceeded: false });
    });
  });
});
