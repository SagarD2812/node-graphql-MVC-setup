import { gql } from 'apollo-server-express';
import userTypeDefs from './user.js';
import rolesTypeDefs from './roles.js';

const baseTypeDefs = gql`
  scalar DateTime
`;

const typeDefs = [
  baseTypeDefs,
  userTypeDefs,
  rolesTypeDefs,
];

export default typeDefs;