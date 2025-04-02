import { gql } from 'apollo-server-express';

const rolesTypeDefs = gql`
  scalar DateTime

  type Roles {
    id: ID!
    name: String
    status: Int
  }

  type RolesResponse {
    status: String!
    code: Int!
    response: String!
    roles: [Roles]
  }

  type Query {
    getAllRoles: RolesResponse!
  }

      type Mutation {
    createRole(
      name: String!
      status: Int!
    ): RolesResponse!
  }
`;

export default rolesTypeDefs;
