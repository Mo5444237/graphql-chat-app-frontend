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
  mutation AddContact($contactInput: contactInputData!) {
    addContact(contactInput: $contactInput)
  }
`;

export const EDIT_CONTACT_MUTATION = gql`
  mutation EditContact($contactInput: contactEditData!) {
    editContact(contactInput: $contactInput)
  }
`;

export const DELETE_CONTACT_MUTATION = gql`
  mutation EditContact($userId: ID!) {
    deleteContact(userId: $userId)
  }
`;
