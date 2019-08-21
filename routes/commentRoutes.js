var db = require("../models");
var checkOwnership = require("../config/middleware/checkOwnership");
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

  app.delete("/api/comments/:id", checkOwnership.comment, function(req, res) {
    db.Comment.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbComment) {
      console.log(
        "----------------------------------console logging dbComment: " +
          dbComment
      );
      res.json(dbComment);
    });
  });
};
