import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($userInput: UserInputData!) {
    login(userInput: $userInput) {
      user {
        _id
        name
        email
        avatar
        online
        lastSeen
      }
      token
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation CreateUser($userInput: CreateUserData!) {
    createUser(userInput: $userInput)
  }
`;

export const GET_USER_QUERY = gql`
  query GetUser {
    getUser {
      _id
      name
      email
      avatar
      online
      lastSeen
    }
  }
`;

export const REFRESH_TOKEN_QUERY = gql`
  query User {
    refreshToken {
      user {
        _id
        name
        email
        avatar
        online
        lastSeen
      }
      token
    }
  }
`;

export const EDIT_PROFILE_MUTATION = gql`
  mutation EditProfile($userInput: editProfileData!) {
    editProfile(userInput: $userInput) {
      _id
      name
      email
      avatar
      online
      lastSeen
    }
  }
`;
