import passport from "passport";
import generateToken from "../token/generateToken";
const ghRouter = require("express").Router();

ghRouter.get(
  "/api/auth/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

ghRouter.get(
  "/api/auth/github/callback",
  passport.authenticate("github", function(req, res) {
    console.log(req.user);
    // passReqToCallback: true,
    // failureRedirect: "/login",
    // session: false,
  })
  // (req: {user: {id: number; username: string } }, res: any) => {
  //   let user = {
  //     id: req.user.id,
  //     username: req.user.username,
  //   };

  //   res.status(200).cookie("JWT", generateToken(user), {
  //     httpOnly: true
  //   }).redirect("/home");
  // }
);

module.exports = ghRouter;
