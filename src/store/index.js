import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user-slice";
import chatsSlice from "./chats-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    user: userSlice,
    chats: chatsSlice,
    ui: uiSlice,
  },
});

export default store;
