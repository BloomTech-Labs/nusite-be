import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildContext } from "graphql-passport";
import passport from "passport";
import typeDefs from "../types";
import resolvers from "../resolvers";

import "../authconfig/google";
const google = require("../routes/google");

import "../authconfig/linkedin";
const linkedIn = require("../routes/linkedin");

const app = express();

app.use(passport.initialize());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Allow the GraphQL playground
  // Will not allow in the production deploy
  introspection: process.env.NODE_ENV !== "production",
  playground: process.env.NODE_ENV !== "production",
  context: ({ req, res }) => buildContext({ req, res }),
});

server.applyMiddleware({ app, cors: { origin: "*", credentials: true } });

app.use("/", linkedIn);

app.use("/", google);

app.use("/", (_req, res) => {
  res.send("Welcome to Partnerd API");
});

export default app;
