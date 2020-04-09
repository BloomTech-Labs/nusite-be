import express from "express";
import passport from "passport";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "../types";
import resolvers from "../resolvers";

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

server.applyMiddleware({ app, cors: { origin: "*", credentials: true } });

app.use("/", (_req, res) => {
  res.send("Welcome to Partnerd API");
});

export default app;
