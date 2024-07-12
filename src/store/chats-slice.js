import { createSlice } from "@reduxjs/toolkit";

const chatsInitialState = {
  chats: [],
  isLoading: false,
  changed: false,
  messages: {},
};

const chatsSlice = createSlice({
  name: "chats",
  initialState: chatsInitialState,
  reducers: {
    setChats: (state, action) => {
      state.isLoading = false;
      state.changed = false;
      state.chats = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setChatsChanged: (state, action) => {
      state.changed = action.payload;
    },
    setChatMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      state.messages[chatId] = [];
      state.messages[chatId].push(...messages);
    },
    updateChatMessages: (state, action) => {
      const { chatId, message, currentUser, activeChat } = action.payload;
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }
      state.messages[chatId].push(message);
      const chatIndex = state.chats.findIndex((chat) => chat._id === chatId);
      if (chatIndex !== -1) {
        state.chats[chatIndex].lastMessage = message;
        if (message.sender._id !== currentUser && message.chatId !== activeChat) {
          state.chats[chatIndex].unreadMessagesCount += 1;
        }
        const updatedChat = state.chats.splice(chatIndex, 1)[0];
        state.chats.unshift(updatedChat);
      }
    },
    markMessagesAsRead: (state, action) => {
      const { chatId } = action.payload;
      const chatIndex = state.chats.findIndex((chat) => chat._id === chatId);
      if (chatIndex !== -1) {
        state.chats[chatIndex].unreadMessagesCount = 0;
      }
    },
  },
});

export const chatsActions = chatsSlice.actions;

export default chatsSlice.reducer;
