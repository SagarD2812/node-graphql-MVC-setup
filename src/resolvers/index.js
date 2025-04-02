// import Mutation from './mutation.resolver.js';
// import Query from './query.resolver.js';

// export { Mutation, Query };

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




