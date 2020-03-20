import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "../types";
import resolvers from "../resolvers";

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app, cors: false });

export default app;
