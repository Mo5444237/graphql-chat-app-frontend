import { createSlice } from "@reduxjs/toolkit";

const userInitailsState = {
    isAuthenticated: false,
    user: null,
    error: null,
}


const userSlice = createSlice({
    name: "user",
    initialState: userInitailsState,
    reducers: {
        setUser: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        clearUser: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        setBlockList(state, action) {
            state.user.blockedUsers = action.payload;
        }
    },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;