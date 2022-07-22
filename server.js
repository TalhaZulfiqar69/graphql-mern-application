import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';
import mongoose from 'mongoose';
import express from 'express';
import http from 'http';
import typeDefs from './schemaGql.js';
import './models/User.js';
import './models/Quote.js';
import resolvers from './resolvers.js';
import { checkIfAuthenticated } from './middlewares/authorizationToken.js';
import dotenv from 'dotenv';
import path from 'path';

const __dirname = path.resolve();
const port = process.env.PORT || 4000;
const app = express();
const httpServer = http.createServer(app);

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('MongoBD connected');
});

mongoose.connection.on('error', (error) => {
  console.log('Error in MongoBD connection', error);
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: checkIfAuthenticated,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
});

// if (process.env.NODE_ENV === 'production') {
app.use(express.static('client/build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
// }

await server.start();
server.applyMiddleware({ app, path: '/graphql' });
httpServer.listen({ port: process.env.PORT }, () => {
  console.log(`Server ready at ${server.graphqlPath}`);
});
