import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "../types";
import resolvers from "../resolvers";

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use("/", (req, res) => {
  res.send("Checking Tests");
});

server.applyMiddleware({ app, cors: false });

export default app;
