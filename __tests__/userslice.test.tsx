import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import userReducer, { fetchUser } from '../src/redux/slices/userSlices';
import { RootState } from '../src/redux/store';
import { AsyncThunkAction } from '@reduxjs/toolkit';

