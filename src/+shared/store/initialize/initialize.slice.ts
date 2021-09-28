import { createSlice } from '@reduxjs/toolkit';

export interface InitializeState {}

const initialState: InitializeState = {};

export const initializeSlice = createSlice({
  name: 'initialize',
  initialState,
  reducers: {
    reset: () => initialState,
    initialize: () => {},
    initializeSuccessfully: () => {}
  },
});
