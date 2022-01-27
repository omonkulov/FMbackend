const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GOOGLE_CLIENT_ID =
  "785327605787-2nfhffdgcbpg4fnkgv51k43oog4ikgb4.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
