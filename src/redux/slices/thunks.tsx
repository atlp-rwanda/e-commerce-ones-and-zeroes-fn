
import { createAsyncThunk } from '@reduxjs/toolkit';

export function createAppAsyncThunk<Returned, ThunkArg = void>(
  typePrefix: string,
  payloadCreator: (arg: ThunkArg, thunkAPI: {
    dispatch: Function,
    getState: Function,
    extra: any,
    requestId: string,
    signal: AbortSignal,
    rejectWithValue: (value: any) => any
  }) => Promise<Returned | ReturnType<typeof thunkAPI['rejectWithValue']>>
) {
  return createAsyncThunk<Returned, ThunkArg, { rejectValue: any }>(
    typePrefix,
    payloadCreator
  );
}

