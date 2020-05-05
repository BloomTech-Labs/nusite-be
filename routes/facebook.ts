const googleRouter = require("express").Router();
import passport from "passport";
import generateToken from "../token/generateToken";

googleRouter.get("/api/auth/facebook", passport.authenticate("facebook"));

// Initial passport route calls this route
// controls creation of token for the frontend
// Frontend will need to redirect themselves once they save the token and user
// will need thoroghly checked with the frontend
googleRouter.get(
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
      .cookie("JWT", generateToken(user), { httpOnly: true })
      .redirect("/home");
  }
);

module.exports = googleRouter;
