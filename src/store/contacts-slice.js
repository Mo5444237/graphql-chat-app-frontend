import { createSlice } from "@reduxjs/toolkit";

const contactsInitialState = {
  contacts: {},
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: contactsInitialState,
  reducers: {
    setContacts: (state, action) => {
      let contacts = action.payload.reduce((obj, user) => {
        obj[user._id] = user;
        return obj;
      }, {});
      state.contacts = contacts;
    },
    updateContactStatus: (state, action) => {
      const { userId, online, lastSeen } = action.payload;
      if (state.contacts[userId]) {
        state.contacts[userId].online = online;
        state.contacts[userId].lastSeen = lastSeen;
      }
    },
  },
});

export const contactsActions = contactsSlice.actions;

export default contactsSlice.reducer;
