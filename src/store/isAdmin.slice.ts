import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IsAdminState {
  value: string[],
}

const initialState: IsAdminState = {
  value: ['false'],
}

export const isAdminSlice = createSlice({
  name: 'isAdmin',
  initialState,
  reducers: {
    setIsAdmin: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload;
    }
  }
});

export const {setIsAdmin} = isAdminSlice.actions;

const isAdminSliceReducer = isAdminSlice.reducer;
export default isAdminSliceReducer;