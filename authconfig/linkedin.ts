import passport from "passport";
import { User } from "../models/Model";
import { hashSync, hash } from "bcryptjs";
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_ID,
      clientSecret: process.env.LINKEDIN_SECRET,
      callbackURL: "http://127.0.0.1:4000/auth/linkedin/callback",
      scope: ["r_emailaddress", "r_liteprofile"],
    },
    (accessToken: string, refreshToken: string, profile: any, done: any) => {
      // asynchronous verification, for effect...
      process.nextTick(async function() {
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

          const [user]: any = await User.add(newUser);
          return done(null, user);
        } else {
          console.log(findUser);
          return done(null, findUser);
        }
      });
    }
  )
);

export default LinkedInStrategy;
