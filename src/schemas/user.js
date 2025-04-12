import { gql } from 'apollo-server-express';

const userTypeDefs = gql`
  scalar DateTime

  type User {
    id: ID!
    first_name: String
    last_name: String
    email: String!
    phone_no: String
    password: String!
  }

  type UserResponse {
    status: String!
    code: Int!
    response: String!
    users: [User]
  }

   
  type Query {
    getAllUsers: UserResponse!
  }

      type Mutation {
    createUser(
      first_name: String!
      last_name: String!
      email: String!
      phone_no: String
      password: String!
    ): UserResponse!
  }


  type AuthResponse {
    status: String!
    code: Int!
    response: String!
    token: String!
    users: [User]
  }

   type Mutation {
    login(email: String!, password: String!): AuthResponse!
  }


`;

export default userTypeDefs;
