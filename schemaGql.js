import { gql } from 'apollo-server-express';
const typeDefs = gql`
  type Query {
    greet: String
    users: [User]
    user(_id: ID!): User
    quotes: [QuoteWithName]
    iquote(by: ID!): [Quote]
    userProfile: User
  }

  type QuoteWithName {
    _id: String
    name: String
    by: IdName
  }

  type IdName {
    _id: String
    firstName: String
  }

  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    quotes: [Quote]
  }

  type Quote {
    _id: String
    by: ID
    name: String
  }

  type Token {
    token: String
  }

  type Mutation {
    registerUser(newUser: UserInput!): User
    signinUser(userSignin: UserSigninInput!): Token
    createQuote(name: String!): String
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input UserSigninInput {
    email: String!
    password: String!
  }
`;

export default typeDefs;
