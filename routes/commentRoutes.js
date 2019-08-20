var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.post("/api/comments", isAuthenticated, function(req, res) {
    var newComment = req.body;
    newComment.UserId = req.user.id;
    db.Comment.create(newComment)
      .then(function() {
        res.status(200).end();
      })
      .catch(function(err) {
        console.log(err);
        res.status(401).json(err);
      });
  });

  app.get("/api/comments/:beaconId", isAuthenticated, function(req, res) {
    db.Comment.findAll({
      where: {
        BeaconId: req.params.beaconId
      },
      include: [db.User]
    }).then(function(results) {
      res.json(results);
    });
  });
};
