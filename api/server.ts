import express from "express";
import { ApolloServer } from "apollo-server-express";
import passport from "passport";
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

app.use(passport.initialize());

app.use("/", (_req, res) => {
  res.send("Welcome to Partnerd API");
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
});

export default app;
