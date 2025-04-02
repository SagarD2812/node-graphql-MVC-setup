import { AuthenticationError, ForbiddenError } from 'apollo-server-core';
// import config from 'config';
// import artistModel from '../models/artistModel.js';
// import errorHandler from './error.controller.js';
// import { signJwt, } from '../utils/jwt.js';
// import checkIsLoggedIn from '../middleware/checkIsLoggedIn.js';
// import followModel from '../models/followModel.js';
// import mongoose from 'mongoose';

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
