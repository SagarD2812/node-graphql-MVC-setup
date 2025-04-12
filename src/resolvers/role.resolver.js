import RoleController from '../controller/RoleController.js';


const roleResolvers = {
  Query: {
    getAllRoles: RoleController.getAllRoles,
  },
  Mutation: {
    createRole: RoleController.createRole,
  },
};

export default roleResolvers;