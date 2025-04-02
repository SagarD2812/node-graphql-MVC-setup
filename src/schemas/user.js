import { gql } from 'apollo-server-express';

const userTypeDefs = gql`
  scalar DateTime

  type User {
    id: ID!
    first_name: String
    last_name: String
    email: String!
    phone_no: String
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
    ): UserResponse!
  }
`;

export default userTypeDefs;
