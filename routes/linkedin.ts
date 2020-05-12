const linkedinRouter = require("express").Router();
import passport from "passport";
import generateToken from "../token/generateToken";

linkedinRouter.get("/api/auth/linkedin", passport.authenticate("linkedin"));

linkedinRouter.get(
  "/api/auth/linkedin/callback",
  passport.authenticate("linkedin", {
    passReqToCallback: true,
    failureRedirect: "/login",
    session: false,
  }),
  (req: { user: { id: number; username: string }; headers: any }, res: any) => {
    let user = {
      id: req.user.id,
      username: req.user.username,
    };

    res
      .status(200)
      .cookie("JWT", generateToken(user))
      .redirect(process.env.REDIRECT_URL);
  }
);

module.exports = linkedinRouter;
