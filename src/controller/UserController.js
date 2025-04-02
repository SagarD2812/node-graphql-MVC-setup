import { AuthenticationError, ForbiddenError } from 'apollo-server-core';
// import config from 'config';
// import artistModel from '../models/artistModel.js';
// import errorHandler from './error.controller.js';
// import { signJwt, } from '../utils/jwt.js';
// import checkIsLoggedIn from '../middleware/checkIsLoggedIn.js';
// import followModel from '../models/followModel.js';
// import mongoose from 'mongoose';
import userModel from '../model/userModel.js';



const getAllUsers = async (_, args) => {
    try {
        const users = await userModel.find().exec();

        return {
            status: "success",
            code: 200,
            response: "Users fetched successfully",
            users: users
        };
    } catch (error) {
        return {
            status: "error",
            code: 500,
            response: "Failed to fetch users",
            error: error.message
        };
    }
};


const createUser = async (_, { first_name, last_name, email, phone_no }) => {
    try {
      const newUser = new userModel({
        first_name,
        last_name,
        email,
        phone_no,
      });
      await newUser.save();
      return {
        status: 'success',
        code: 200,
        response: 'User created successfully',
        users: [newUser],
      };
    } catch (error) {
      return {
        status: 'error',
        code: 500,
        response: 'Error creating user',
        users: [],
      };
    }
  };
  
export default {getAllUsers,createUser}
