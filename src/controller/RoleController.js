import { AuthenticationError, ForbiddenError } from 'apollo-server-core';

import roleModel from '../model/roleModel.js';



const getAllRoles = async (_, args) => {
    try {
        const roles = await roleModel.find().exec();

        return {
            status: "success",
            code: 200,
            response: "roles fetched successfully",
            roles: roles
        };
    } catch (error) {
        return {
            status: "error",
            code: 500,
            response: "Failed to fetch roles",
            error: error.message
        };
    }
};


const createRole = async (_, { name,status }) => {
    try {
      const newRole = new roleModel({
        name,
        status,
      });
      await newRole.save();
      return {
        status: 'success',
        code: 200,
        response: 'Role created successfully',
        roles: [newRole],
      };
    } catch (error) {
      return {
        status: 'error',
        code: 500,
        response: 'Error creating role',
        roles: [],
      };
    }
  };
  
export default {getAllRoles,createRole}
