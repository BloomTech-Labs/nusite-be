import passport from "passport";
import { User } from "../models/Model";
import { hash } from "bcryptjs";
const FacebookStrategy = require("passport-facebook");

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/callback",
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: any,
      done: any
    ) => {
      // asynchronous verification, for effect...
      // To keep the example simple, the user's LinkedIn profile is returned to
      // represent the logged-in user. In a typical application, you would want
      // to associate the LinkedIn account with a user record in your database,
      // and return that user instead.
      const findUser = await User.findBy({ email: profile.emails[0].value });

      if (!findUser) {
        const pw = await hash(profile.displayName, 12);

        const newUser = {
          username: profile.displayName,
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          email: profile.emails[0].value,
          password: pw,
        };

        const [{ password, ...user }]: any = await User.add(newUser);

        return done(null, user);
      } else {
        return done(null, findUser);
      }
    }
  )
);
