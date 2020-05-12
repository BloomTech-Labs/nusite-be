const facebookRouter = require("express").Router();
import passport from "passport";
import generateToken from "../token/generateToken";

facebookRouter.get("/api/auth/facebook", passport.authenticate("facebook"));

facebookRouter.get(
  "/api/auth/facebook/callback",
  passport.authenticate("facebook", {
    passReqToCallback: true,
    failureRedirect: "/login",
    session: false,
  }),
  (req: { user: { id: number; displayName: string } }, res: any) => {
    let user = {
      id: req.user.id,
      username: req.user.displayName,
    };

    res
      .status(200)
      .cookie("JWT", generateToken(user), { httpOnly: false })
      .redirect(process.env.REDIRECT_URL);
  }
);

module.exports = facebookRouter;
