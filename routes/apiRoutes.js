// TDB: As of 10pm Friday night, I don't feel like I'm following the way these first two api routes for passport work.
// It's currently just an optimistic copy and paste from the example. I'd like to go over this part with either Cassidy or Max.

var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    function getDisplayName(str1, str2) {
      var displayName = str1 + " " + str2[0] + ".";
      return displayName;
    }
    function toTitleCase(str) {
      return str.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
      });
    }
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: toTitleCase(req.body.firstName),
      lastName: toTitleCase(req.body.lastName),
      displayName: getDisplayName(
        toTitleCase(req.body.firstName),
        toTitleCase(req.body.lastName)
      )
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
};
