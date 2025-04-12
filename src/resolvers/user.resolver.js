import UserController from '../controller/UserController.js';
import authenticate from '../middleware/authenticate.js'; // Import the authentication wrapper


const userResolvers = {
  Query: {
    getAllUsers: authenticate(UserController.getAllUsers),
  },
  Mutation: {
    createUser: UserController.createUser,
    login: UserController.login,
  },
};

export default userResolvers;