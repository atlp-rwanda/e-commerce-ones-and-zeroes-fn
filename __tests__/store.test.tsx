// store.test.ts

import { store, RootState } from '../src/redux/store';
import userReducer, { fetchUser } from '../src/redux/slices/userSlices';

describe('Redux Store Configuration', () => {
  test('Initial state of user slice', () => {
    const initialState: RootState = store.getState();

    // Assert initial state values or structure
    expect(initialState.user).toEqual({
      user: null,
      loading: false,
      error: null,
    });
  });

  test('fetchUser action dispatches correctly', () => {
    const id = "1234";

    // Dispatch the fetchUser action
    store.dispatch(fetchUser(id));

    // Get the updated state after dispatching the action
    const updatedState: RootState = store.getState();

    // Assert that the loading state or other flags are set as expected
    expect(updatedState.user.loading).toBe(true); // Adjust based on your slice implementation
  });

  // Add more tests for other actions and state updates as needed
});
