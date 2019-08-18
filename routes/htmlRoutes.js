// TDB: Just noting that I've removed the requiring of path from the passport example, because I think using
// handlebars means we don't need them. I might be wrong about that.

// Requiring our middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

var db = require("../models");

module.exports = function(app) {
  // The current structure I'm working with is:
  // "/" for landing page, which links to a sign in page and a log in page
  // "/login" for login page
  // "/signup" for signup page
  // "/events" for the main page you see once you're authenticated
  // Cassidy and Max, feel free to change any of these titles to whatever you're comfortable with.

  // If the user already has an account, persistent login from passport.js sends them to the events page
  // Otherwise they go to the landing page
  app.get("/", function(req, res) {
    if (req.user) {
      return res.redirect("/beacon/1");
    }
    res.render("index", {});
  });

  // If the user already has an account, persistent login from passport.js sends them to the events page
  // Otherwise they go to the landing page
  app.get("/login", function(req, res) {
    if (req.user) {
      return res.redirect("/beacon/1");
    }
    res.render("login", {});
  });

  // If the user already has an account, persistent login from passport.js sends them to the events page
  // Otherwise they go to the landing page
  app.get("/signup", function(req, res) {
    if (req.user) {
      return res.redirect("/beacon/1");
    }
    res.render("signup", {});
  });

  // We'll use the isAuthenticated middleware in all other get requests to redirect users to the landing page
  // if they aren't logged in.

  app.get("/beacon/:id", isAuthenticated, function(req, res) {
    console.log(req.user);
    db.Beacon.findAll({}).then(function() {
      res.render("beacon-details", {
        // examples: dbExamples
      });
      console.log("successful!");
    });
  });

  // Load example page and pass in an example by id
  //   app.get("/example/:id", isAuthenticated, function(req, res) {
  //     db.Beacon.findOne({ where: { id: req.params.id } }).then(function(
  //       dbExample
  //     ) {
  //       res.render("example", {
  //         example: dbExample
  //       });
  //     });
  //   });

  //   // Render 404 page for any unmatched routes
  //   app.get("*", function(req, res) {
  //     res.render("404");
  //   });
};
