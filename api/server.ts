import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildContext } from "graphql-passport";
import passport from "passport";
import typeDefs from "../types";
import resolvers from "../resolvers";
import cookieParser from "cookie-parser";

import "../authconfig/linkedin";
import "../authconfig/facebook";
const linkedIn = require("../routes/linkedin");
const facebook = require("../routes/facebook");

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

app.use(cookieParser());

app.use("/", linkedIn);
app.use("/", facebook);

app.use("/", (_req, res) => {
  res.send("Welcome to Partnerd API");
});

export default app;
