import { gql } from '@apollo/client';

// TODO: USER REGISTRATION MUTATION:
export const SIGNUP_USER = gql`
  mutation userRegistration($newUser: UserInput!) {
    user: registerUser(newUser: $newUser) {
      firstName
    }
  }
`;

// TODO: USER LOGIN MUTATION:
export const LOGIN_USER = gql`
  mutation loginUser($userSignin: UserSigninInput!) {
    user: signinUser(userSignin: $userSignin) {
      token
    }
  }
`;

// TODO: CREATE QUOTE MUTATION:
export const CREATE_QUOTE = gql`
  mutation creatingQuote($name: String!) {
    quote: createQuote(name: $name)
  }
`;

// TODO: GET USER's QUOTES MUTATION:
export const GET_USER_QOUTES = gql`
  query getQuoteByUser($userId: ID!) {
    iquote(by: $userId) {
      name
      by
    }
  }
`;
