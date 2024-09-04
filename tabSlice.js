import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTab: 0, 
  healthCheckerResult: null
};

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    setHealthCheckerResult: (state, action) => {
      state.healthCheckerResult = action.payload;
    },
  },
});

export const { setCurrentTab, setHealthCheckerResult } = tabSlice.actions;

export default tabSlice.reducer;
