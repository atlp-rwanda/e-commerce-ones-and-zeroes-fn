// import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
// import userReducer, { fetchUser } from '../src/redux/slices/userSlices';
// import { RootState } from '../src/redux/store';
// import { AsyncThunkAction } from '@reduxjs/toolkit';

// // Create a mock Redux store
// const mockStore = configureStore<RootState>();

// describe('Redux Async Action Creators', () => {
//   let store: MockStoreEnhanced<RootState>;
//   let mockAxios: MockAdapter;

//   beforeEach(() => {
//     store = mockStore({ user: { user: null, loading: false, error: null } });
//     mockAxios = new MockAdapter(axios);
//   });

//   afterEach(() => {
//     mockAxios.restore();
//   });

//   it('fetchUser action creator success', async () => {
//     const mockUserId = '123';
//     const mockUser = {
//       userId: '123',
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'john.doe@example.com',
//       // Other fields...
//     };

//     // Mock axios GET request response
//     mockAxios.onGet(`http://localhost:7000/api/users/${mockUserId}`).reply(200, { data: mockUser });

//     // Dispatch the fetchUser action creator
//     const fetchUserAction: AsyncThunkAction<any, string, any> = store.dispatch(fetchUser(mockUserId));

//     // Wait for the async action to complete
//     await fetchUserAction;

//     // Get the dispatched actions from the store
//     const actions = store.getActions();

//     // Assert the sequence and content of dispatched actions
//     expect(actions).toEqual([
//       { type: fetchUser.pending.type, meta: { arg: mockUserId, requestId: expect.any(String) } }, // Check pending action
//       { type: fetchUser.fulfilled.type, payload: mockUser, meta: { arg: mockUserId, requestId: expect.any(String) } }, // Check fulfilled action
//     ]);
//   });

//   it('fetchUser action creator failure', async () => {
//     const mockUserId = '123';
//     const errorMessage = 'User not found';

//     // Mock axios GET request to simulate failure
//     mockAxios.onGet(`http://localhost:7000/api/users/${mockUserId}`).reply(404, { error: errorMessage });

//     // Dispatch the fetchUser action creator
//     const fetchUserAction: AsyncThunkAction<any, string, any> = store.dispatch(fetchUser(mockUserId));

//     // Wait for the async action to complete
//     await fetchUserAction;

//     // Get the dispatched actions from the store
//     const actions = store.getActions();

//     // Assert the sequence and content of dispatched actions
//     expect(actions).toEqual([
//       { type: fetchUser.pending.type, meta: { arg: mockUserId, requestId: expect.any(String) } }, // Check pending action
//       { type: fetchUser.rejected.type, error: { message: errorMessage }, meta: { arg: mockUserId, requestId: expect.any(String) } }, // Check rejected action
//     ]);
//   });
// });
