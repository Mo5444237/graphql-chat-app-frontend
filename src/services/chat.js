import { gql } from "@apollo/client";

export const GET_CHATS_QUERY = gql`
  query GetUserChats {
    getUserChats {
      _id
      name
      type
      avatar
      lastMessage {
        _id
        content
        type
        sender {
          _id
          name
        }
        createdAt
        updatedAt
      }
      admin
      users {
        _id
        name
        avatar
        online
      }
      unreadMessagesCount
      createdAt
      updatedAt
    }
  }
`;

export const GET_CHAT_MESSAGES_QUERY = gql`
  query Query($chatId: ID!) {
    getChatMessages(chatId: $chatId) {
      _id
      chatId
      content
      caption
      type
      sender {
        _id
        name
        avatar
      }
      readBy {
        _id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_CHAT_MEDIA_QUERY = gql`
  query GetChatMedia($chatId: ID!) {
    getChatMedia(chatId: $chatId) {
      _id
      chatId
      content
      caption
      type
      sender {
        _id
        name
        avatar
      }
      readBy {
        _id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_CHAT_MUTATION = gql`
  mutation CreateChat($chatInput: ChatInputData!) {
    createChat(chatInput: $chatInput) {
      _id
      name
      type
      lastMessage {
        _id
        chatId
        content
        type
        sender {
          _id
          name
        }
        createdAt
        updatedAt
        readBy {
          _id
          name
        }
      }
      users {
        _id
        name
        avatar
        email
        online
        lastSeen
      }
      createdAt
      updatedAt
    }
  }
`;

export const EDIT_CHAT_MUTATION = gql`
  mutation EditChat($chatInput: EditChatInputData!) {
    editChat(chatInput: $chatInput) {
      _id
      name
      type
      lastMessage {
        _id
        chatId
        content
        caption
        type
        sender {
          _id
          name
          avatar
        }
        readBy {
          _id
          name
          avatar
        }
        createdAt
        updatedAt
      }
      users {
        _id
        name
        avatar
      }
      avatar
      createdAt
      updatedAt
    }
  }
`;

export const ADD_USERS_TO_CHAT = gql`
  mutation AddUsersToChat($chatInput: AddUsersInputData!) {
    addUsersToChat(chatInput: $chatInput)
  }
`;

export const DELETE_USER_FROM_CHAT = gql`
  mutation DeleteUserFromChat($chatInput: EditChatUsersInputData!) {
    deleteUserFromChat(chatInput: $chatInput)
  }
`;

export const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessage($messageInput: MessageInputData!) {
    sendMessage(messageInput: $messageInput) {
      _id
      chatId
      content
      type
      sender {
        avatar
        _id
        name
      }
      readBy {
        _id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const MARK_MESSAGES_AS_SEEN_MUTATION = gql`
  mutation MarkMessageAsSeen($chatId: ID!) {
    markMessageAsSeen(chatId: $chatId)
  }
`;
