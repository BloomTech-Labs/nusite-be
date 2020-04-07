import express from "express";
import passport from "passport";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "../types";
import resolvers from "../resolvers";

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app, cors: false });

app.use(passport.initialize());
app.use(passport.session());

app.use("/", (req, res) => {
  res.send("Checking Tests");
});

export default app;
