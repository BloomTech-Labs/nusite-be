import passport from "passport";
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_KEY,
      clientSecret: process.env.LINKEDIN_SECRET,
      callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
      scope: ["r_emailaddress", "r_basicprofile"],
      state: true,
    },
    (accessToken: string, refreshToken: string, profile: any, done: any) => {
      // asynchronous verification, for effect...
      process.nextTick(function() {
        // To keep the example simple, the user's LinkedIn profile is returned to
        // represent the logged-in user. In a typical application, you would want
        // to associate the LinkedIn account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    }
  )
);
