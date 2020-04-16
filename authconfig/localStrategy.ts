import { User } from "../models/Model";
import bcrypt from "bcryptjs";
import passport from "passport";
import { GraphQLLocalStrategy } from "graphql-passport";

passport.use(
  new GraphQLLocalStrategy(async (email, password, done) => {
    const [user] = await User.findBy({ email: email });

    console.log(user, "GraphQL Local Strategy");

    // Compare the passwords
    const valid = await bcrypt.compare(password, user.password);

    // Set the error if there is one
    const error = !user
      ? new Error("No user matches that email")
      : !valid
      ? new Error("Password is incorrect.")
      : null;

    // return the error and the user
    return done(error, user);
  })
);
