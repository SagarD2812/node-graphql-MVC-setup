// import http from 'http';
// // import express from 'express'
// import { ApolloServer } from 'apollo-server-express';
// import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
// import config from 'config';
// import cors from 'cors';
// import connectDB from './utils/connectDB.js';
// // import { Server } from "socket.io"
// // import path from 'path'
// // import { fileURLToPath } from 'url'
// import typeDefs from './schemas/index.js';
// import app from './app.js';
// // import { Query, Mutation } from './resolvers/index.js';
// import resolvers from './resolvers/index.js';


// import DateTime from './resolvers/datetime.js';
// // import getAuthUser from './middleware/authUser.js';
// const httpServer = http.createServer(app);
// // const io = socket.io(httpServer);


// const corsOptions = {
//   origin: ['http://localhost:8001', 'http://localhost:2000', 'https://studio.apollographql.com'],
//   credentials: true,
// };



// app.use(cors(corsOptions));




// // const __filename = fileURLToPath(import.meta.url)
// // const __dirname = path.dirname(__filename)

// // const PORT = process.env.PORT || 3500


// // app.use(express.static(path.join(__dirname, "public")))

// // const expressServer = app.listen(PORT, () => {
// //   console.log(`listening on port ${PORT}`)
// // })

// // const io = new Server(expressServer, {
// //   cors: {
// //     origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:3500", "http://127.0.0.1:3500"]
// //   }
// // });


// // io.on('connection', socket => {
// //   console.log(`User ${socket.id} connected`)

// //   // Upon connection - only to user 
// //   socket.emit('message', "Welcome to chat")

// //   // Upon connection - to all others 
// //   socket.broadcast.emit('message', `User ${socket.id.substring(0, 5)}} connected`)

// //   // Listening for a message event 
// //   socket.on('message', data => {
// //     console.log(data)
// //     io.emit('message', `${socket.id.substring(0, 5)}: ${data}`)
// //   })

// //   // When user disconnects - to all others 
// //   socket.on('disconnect', () => {
// //     socket.broadcast.emit('message', `User ${socket.id.substring(0, 5)}} disconnected`)
// //   })

// //   // Listen for activity 
// //   socket.on('activity', (name) => {
// //     socket.broadcast.emit('activity', name)
// //   })

// // })



// const resolvers = {
//   DateTime,
//   // Query,
//   // Mutation,
//   resolvers
// };

// (async function () {
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
//     context: async ({ req, res }) => ({ req, res }),
//   });


//   // Web Socket 
//   //   io.on('connection', (socket) => {
//   //     console.log('User connected');

//   //     // Handle message events
//   //     socket.on('message', (message) => {
//   //        console.log(`Message received: ${message}`);
//   //        io.emit('message', message); // broadcast message to all users
//   //     });
//   //  })

//   // Web Socket Ends Here



//   // CONNECT DB
//   await connectDB();

//   // START APOLLO SERVER
//   await server.start();

//   server.applyMiddleware({ app, cors: corsOptions });

//   const port = config.get('port');

//   await new Promise((resolve) => httpServer.listen(port, '0.0.0.0', resolve));
//   console.log(
//     `Server Started at http://localhost:${port}${server.graphqlPath}`
//   );
// })();

// process.on('unhandledRejection', (err) => {
//   console.log('UNHANDLED REJECTION ?? Shutting down...');
//   console.error('Error?', err.message);

//   httpServer.close(async () => {
//     process.exit(1);
//   });
// });

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
    context: async ({ req, res }) => ({ req, res }),
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

