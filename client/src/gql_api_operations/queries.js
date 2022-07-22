import { gql } from '@apollo/client';

export const GET_ALL_QUOTES = gql`
  query getAllQuotes {
    quotes {
      _id
      name
      by {
        _id
        firstName
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUserById($userId: ID!) {
    user(_id: $userId) {
      _id
      firstName
      lastName
      email
      quotes {
        _id
        name
        by
      }
    }
  }
`;

export const GET_ALL_USERS = gql`
  query getAllUsers {
    users {
      _id
      firstName
      lastName
      email
      quotes {
        name
        by
      }
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query profileData {
    user: userProfile {
      _id
      firstName
      lastName
      email
      quotes {
        name
      }
    }
  }
`;
