import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTab: 0, 
  healthCheckerResult: null,
  valueCheckerResult: null
};

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    setHealthCheckerResult: (state, action) => {
      console.log(action.payload,"reduxx")
      state.healthCheckerResult = action.payload;
    },
    setValueCheckerResult: (state, action) => {
      console.log(action.payload,"reduxx")
      state.valueCheckerResult = action.payload;
    },
  },
});

export const { setCurrentTab, setHealthCheckerResult, setValueCheckerResult } = tabSlice.actions;

export default tabSlice.reducer;
