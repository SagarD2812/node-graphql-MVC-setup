

import userResolvers from './user.resolver.js';
import roleResolvers from './role.resolver.js';


const resolvers= {
  Query: {
    ...userResolvers.Query,
    ...roleResolvers.Query,

  },
  Mutation: {
    ...userResolvers.Mutation,
    ...roleResolvers.Mutation,
  },
};

export default resolvers;




