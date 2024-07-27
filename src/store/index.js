import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user-slice";
import chatsSlice from "./chats-slice";
import uiSlice from "./ui-slice";
import contactsSlice from "./contacts-slice";

const store = configureStore({
  reducer: {
    user: userSlice,
    chats: chatsSlice,
    ui: uiSlice,
    contacts: contactsSlice,
  },
});

export default store;
