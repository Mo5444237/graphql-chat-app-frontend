import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: localStorage.getItem("theme") || "dark",
};

const themeSlice = createSlice({
  initialState: initialState,
  name: "theme",
  reducers: {
    setLightMode: (state, action) => {
      state.mode = "light";
      localStorage.setItem("theme", "light");
    },
    setDarkMode: (state, action) => {
      state.mode = "dark";
      localStorage.setItem("theme", "dark");
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;
