import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildContext } from "graphql-passport";
import passport from "passport";
import typeDefs from "../types";
import resolvers from "../resolvers";

const authRoutes = require("../routes/auth-routes");
const passportSetup = require('../authconfig/oauth');

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

// set view engine - Take Out!
app.set("view engine", "ejs");

// app.use("/", (_req, res) => {
//   res.send("Welcome to Partnerd API");
// });

// auth route setup - take out?
app.use("/auth", authRoutes);

// render home - take out
app.use("/", (_req, res) => {
  res.render("home");
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: "https://www.googleapis.com/auth/userinfo.email",
  })
);

app.get(
  "/auth/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

export default app;
