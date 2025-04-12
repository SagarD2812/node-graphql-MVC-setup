import { AuthenticationError, ForbiddenError } from 'apollo-server-core';

import jwt from 'jsonwebtoken';
import userModel from '../model/userModel.js';

const login = async (_, { email, password}) => {

  try {
    // Check if user exists
    const users = await userModel.findOne({ email });
    if (!users) {
      return {
        status: 'error',
        code: 401,
        response: 'Invalid email or password',
        token: '',
        users: [],
      };
    }

    // Check if password matches
    const isMatch = await users.comparePassword(password);
    if (!isMatch) {
      
      return {
        status: 'error',
        code: 401,
        response: 'Invalid email or password',
        token: '',
        users: [],
      };
    }

    // Generate JWT token
    const token = jwt.sign({ id: users._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
   
    return {
      status: 'success',
      code: 200,
      response: 'Login successful',
      token,
      users: [users]
    };
  } catch (error) {
   
    return {
      status: 'error',
      code: 500,
      response: 'Server error',
      token: '',
      users: [],
    };
  }

};

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


const createUser = async (_, { first_name, last_name, email, phone_no, password }) => {
    try {
      const newUser = new userModel({
        first_name,
        last_name,
        email,
        phone_no,
        password,
      });
      await newUser.save();
      return {
        status: 'success',
        code: 200,
        response: 'User created successfully',
        users: [newUser],
      };
    } catch (error) {
     // Log the error for debugging

      return {
        status: 'error',
        code: 500,
        response: 'Error creating user',
        users: [],
      };
    }
  };

  

  
export default {getAllUsers,createUser,login}
