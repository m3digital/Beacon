var db = require("../models");

module.exports = function(app) {
  app.get("/api/beacons", function(req, res) {
    db.Beacon.findAll({ include: [db.User] }).then(function(dbBeacons) {
      res.json(dbBeacons);
    });
  });
  app.get("/api/beacons/:id", function(req, res) {
    db.Beacon.find({
      include: [db.User],
      where: {
        id: req.params.id
      }
    }).then(function(dbBeacon) {
      res.json(dbBeacon);
    });
  });
  app.post("/api/beacons", function(req, res) {
    db.Beacon.create(req.body).then(function(dbBeacon) {
      res.json(dbBeacon);
    });
  });
};
