const router = require("express").Router();
const passport = require("passport");
const { sign } = require("jsonwebtoken");

router.get("/auth/linkedin", passport.authenticate("linkedin"));

router.get(
  "/auth/linkedin/callback",
  passport.authenticate("linkedin", {
    // successRedirect: "/dashboard",
    passReqToCallback: true,
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    console.log(req.user.id);
    let user = {
      id: req.user.id,
      username: req.user.username,
    };
    const token = sign(user, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ token, user });
  }
);

module.exports = router;
