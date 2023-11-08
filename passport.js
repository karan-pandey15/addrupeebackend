import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

const CLIENT_ID =
  "259431458441-3n00hqmc7jbup24r60uq3jj6co0ik723.apps.googleusercontent.com";
const CLIENT_SECRET = "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";

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID, // Your Credentials here.
      clientSecret: CLIENT_SECRET, // Your Credentials here.
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

export default passport;
