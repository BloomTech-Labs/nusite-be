import passport from "passport";
import { User } from "../models/Model";
import { hash } from "bcryptjs";
const FacebookStrategy = require("passport-facebook");

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: any,
      done: any
    ) => {
      // asynchronous function
      // should search db for existing user and login if exists
      // else create a user in the db and return the created user
      const findUser = await User.findBy({ auth_id: profile.id });

      if (!findUser) {
        const pw = await hash(profile.displayName, 12);

        const newUser = {
          username: profile.displayName,
          first_name: "Please Update",
          last_name: "Please Update",
          email: `pleaseUpdate@fillerEmail.com`,
          password: pw,
          auth_id: profile.id,
        };

        const [{ password, ...user }]: any = await User.add(newUser);

        return done(null, user);
      } else {
        return done(null, findUser);
      }
    }
  )
);
