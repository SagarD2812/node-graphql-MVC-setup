import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-core';

const authenticate = (resolver) => {
  return async (parent, args, context, info) => {
    const token = context.req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
      throw new AuthenticationError('Authentication token is missing');
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      context.user = decoded; // Attach the authenticated user to the context
    } catch (error) {
      throw new AuthenticationError('Invalid or expired token');
    }

    // Call the original resolver
    return resolver(parent, args, context, info);
  };
};

export default authenticate;