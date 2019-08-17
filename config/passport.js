var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// LocalStrategy is what we use when we want login with a username/email and password.
// Setting the username field to email specifies email instead of another kind of username.
passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    function(email, password, done) {
      // When a user tries to sign in, this code checks to see if we have their email in our table of users.
      db.User.findOne({
        where: {
          email: email
        }
      }).then(function(dbUser) {
        // If we don't have their email, we yell at them for being dumb.
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect email."
          });
        }
        // If the email is fine but the password is wrong, we make them feel guilty.
        else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        // If no problems, we return the user.
        return done(null, dbUser);
      });
    }
  )
);

// This code makes persistent login sessions possible. Users will get annoyed real quick if they get logged out between each request.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;
