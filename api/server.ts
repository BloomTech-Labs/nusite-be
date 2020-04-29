import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildContext } from "graphql-passport";
import passport from "passport";
import typeDefs from "../types";
import resolvers from "../resolvers";

const passportSetup = require("../authconfig/oauth");
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

app.use("/", (_req, res) => {
  res.send("Welcome to Partnerd API");
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ]
  })
);

app.get(
  "/auth/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    return res
      .status(200),
    res.redirect("/dashboard");
  }
);

export default app;
