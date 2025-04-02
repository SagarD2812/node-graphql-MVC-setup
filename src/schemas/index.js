import { gql } from 'apollo-server-express';
import userTypeDefs from './user.js';
import rolesTypeDefs from './roles.js';
// Import other schemas here (e.g., postTypeDefs, commentTypeDefs)

const baseTypeDefs = gql`
  scalar DateTime
`;

const typeDefs = [
  baseTypeDefs,
  userTypeDefs,
  rolesTypeDefs,
  // Add other schemas here (e.g., postTypeDefs, commentTypeDefs)
];

export default typeDefs;