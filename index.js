require("./auth");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const app = express();

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("<a href='/auth/google'>Login with Google</a>");
});

app.get("/auth/google", passport.authenticate("google", { scope: ["openid"] }));

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  })
);
app.get("/protected", isLoggedIn, (req, res) => {
  console.log(req.user);
  res.send(`Hello {World}`);
});

app.get("/auth/failure", (req, res) => {
  res.send("Something went wrong");
});

app.get("/logout", (req, res) => {
  req.logout();
  req.session.destory();
  res.send("Goodbye");
});
app.listen(process.env.PORT || 5000, () => {
  console.log("http://localhost:5000");
});
