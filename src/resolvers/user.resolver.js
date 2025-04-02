import UserController from '../controller/UserController.js';

const userResolvers = {
  Query: {
    getAllUsers: UserController.getAllUsers,
  },
  Mutation: {
    createUser: UserController.createUser,
  },
};

export default userResolvers;