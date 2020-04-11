import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "../types";
import resolvers from "../resolvers";

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Allow the GraphQL playground
  // Will not allow in the production deploy
  introspection: process.env.NODE_ENV !== "production",
  playground: process.env.NODE_ENV !== "production",
});

server.applyMiddleware({ app, cors: { origin: "*", credentials: true } });

app.use("/", (_req, res) => {
  res.send("Welcome to Partnerd API");
});

export default app;
