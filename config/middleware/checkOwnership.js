var db = require("../../models");

var checkOwnership = {
  beacon: function(req, res, next) {
    db.Beacon.findOne({
      include: [db.User],
      where: {
        id: req.params.id
      }
    }).then(function(foundBeacon) {
      if (foundBeacon.User.id === req.user.id || req.user.isAdmin) {
        return next();
      } else {
        console.log(
          "That isn't your beacon, and you aren't an admin, so shame on you!"
        );
      }
      console.log("foundBeacon.User.id: " + foundBeacon.User.id);
      console.log("req.User.id: " + req.user.id);
    });
  },
  comment: function(req, res, next) {
    db.Comment.findOne({
      include: [db.User],
      where: {
        id: req.params.id
      }
    }).then(function(foundComment) {
      if (foundComment.User.id === req.user.id || req.user.isAdmin) {
        return next();
      } else {
        console.log(
          "That isn't your comment, and you aren't an admin, so shame on you!"
        );
      }
      console.log("foundComment.User.id: " + foundComment.User.id);
      console.log("req.User.id: " + req.user.id);
    });
  }
};

module.exports = checkOwnership;
