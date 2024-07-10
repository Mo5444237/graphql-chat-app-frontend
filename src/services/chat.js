import { gql } from "@apollo/client";

export const GET_CHATS_QUERY = gql`
  query GetUserChats {
    getUserChats {
      _id
      name
      type
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
      users {
        _id
        name
        avatar
        online
      }
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
