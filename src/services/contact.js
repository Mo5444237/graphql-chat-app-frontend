import { gql } from "@apollo/client";

export const GET_CONTACTS_QUERY = gql`
  query GetContacts {
    getContacts {
      _id
      name
      avatar
    }
  }
`;

export const ADD_CONTACT_MUTATION = gql`
  mutation AddContact($email: String!) {
    addContact(email: $email)
  }
`;

// const DELETE_CONTACT_MUTATION = gql``;
