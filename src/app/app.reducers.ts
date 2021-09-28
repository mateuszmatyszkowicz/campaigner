import { initializeSlice, InitializeState } from "../+shared/store/initialize/initialize.slice";

export interface StoreState {
  initialize: InitializeState;
}

export const reducers = {
  initialize: initializeSlice.reducer,
};
