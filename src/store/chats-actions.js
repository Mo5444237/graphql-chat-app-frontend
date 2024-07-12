import {
  GET_CHATS_QUERY,
  GET_CHAT_MESSAGES_QUERY,
  MARK_MESSAGES_AS_SEEN_MUTATION,
} from "../services/chat";
import client from "../services/graphql";
import { chatsActions } from "./chats-slice";

export const fetchUserChats = () => {
  return async (dispatch) => {
    try {
      dispatch(chatsActions.setIsLoading(true));
      const { data } = await client.query({
        query: GET_CHATS_QUERY,
        context: {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      });
      dispatch(chatsActions.setChats(data.getUserChats));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchChatMessages = (chatId) => {
  return async (dispatch) => {
    try {
      const { data } = await client.query({
        query: GET_CHAT_MESSAGES_QUERY,
        variables: {
          chatId: chatId,
        },
        context: {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
        fetchPolicy: "network-only",
      });

      dispatch(
        chatsActions.setChatMessages({
          chatId: chatId,
          messages: data.getChatMessages,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const markMessagesAsRead = (chatId) => {
  return async (dispatch) => {
    try {
      dispatch(chatsActions.markMessagesAsRead({ chatId }));
      const { data } = client.mutate({
        mutation: MARK_MESSAGES_AS_SEEN_MUTATION,
        variables: {
          chatId: chatId,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};
