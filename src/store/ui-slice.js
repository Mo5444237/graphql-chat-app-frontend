import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    toggleDarkMode: (state, action) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
