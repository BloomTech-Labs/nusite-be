const facebookRouter = require("express").Router();
import passport from "passport";
import generateToken from "../token/generateToken";

facebookRouter.get("/api/auth/facebook", passport.authenticate("facebook"));

facebookRouter.get(
  "/api/auth/facebook/callback",
  passport.authenticate("facebook", {
    passReqToCallback: true,
    session: false,
  }),
  (req: { user: { id: number; displayName: string } }, res: any) => {
    let user = {
      id: req.user.id,
      username: req.user.displayName,
    };

    const token = generateToken(user);

    res
      .status(200)
      .cookie("JWT", token, {
        domain: process.env.COOKIE_DOMAIN,
        path: "/",
      })
      .redirect(`${process.env.REDIRECT_URL}?token=${token}&query=${user.id}`);
  }
);

module.exports = facebookRouter;
