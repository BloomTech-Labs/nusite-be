import express from "express";
import { ApolloServer } from "apollo-server-express";
import passport from "passport";
import typeDefs from "../types";
import resolvers from "../resolvers";

import "../authconfig/linkedin";

const app = express();
app.use(passport.initialize());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Allow the GraphQL playground
  // Will not allow in the production deploy
  introspection: process.env.NODE_ENV !== "production",
  playground: process.env.NODE_ENV !== "production",
});

server.applyMiddleware({ app, cors: { origin: "*", credentials: true } });

app.get("/auth/linkedin", passport.authenticate("linkedin"));

app.get(
  "/auth/linkedin/callback",
  passport.authenticate("linkedin", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    session: false,
  })
);

app.use("/", (_req, res) => {
  res.send("Welcome to Partnerd API");
});

export default app;
