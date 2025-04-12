

import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import config from 'config';
import cors from 'cors';
import connectDB from './utils/connectDB.js';
import typeDefs from './schemas/index.js';
import resolvers from './resolvers/index.js'; // Import resolvers from the correct file
import app from './app.js';



const httpServer = http.createServer(app);

const corsOptions = {
  origin: ['http://localhost:8001', 'http://localhost:2000', 'https://studio.apollographql.com'],
  credentials: true,
};

app.use(cors(corsOptions));

(async function () {
  const server = new ApolloServer({
    typeDefs,
    resolvers, // Use the imported resolvers
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: async ({ req, res }) => {
    //  console.log('Headers:', req.headers); // Log the headers for debugging
      return { req, res };
    },
  });

  // CONNECT DB
  await connectDB();

  // START APOLLO SERVER
  await server.start();

  server.applyMiddleware({ app, cors: corsOptions });

  const port = config.get('port');

  await new Promise((resolve) => httpServer.listen(port, '0.0.0.0', resolve));
  console.log(
    `Server Started at http://localhost:${port}${server.graphqlPath}`
  );
})();

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION ?? Shutting down...');
  console.error('Error?', err.message);

  httpServer.close(async () => {
    process.exit(1);
  });
});

