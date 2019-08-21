var db = require("../models");
var checkOwnership = require("../config/middleware/checkOwnership");
var googleMapsClient = require("@google/maps").createClient({
  key: process.env.GOOGLEAPI
});

module.exports = function(app) {
  app.get("/api/beacons", function(req, res) {
    db.Beacon.findAll({ include: [db.User] }).then(function(dbBeacons) {
      res.json(dbBeacons);
    });
  });
  app.get("/api/beacons/:id", function(req, res) {
    db.Beacon.findOne({
      include: [db.User],
      where: {
        id: req.params.id
      }
    }).then(function(dbBeacon) {
      res.json(dbBeacon);
    });
  });
  app.delete("/api/beacons/:id", checkOwnership.beacon, function(req, res) {
    db.Beacon.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbBeacon) {
      res.json(dbBeacon);
    });
  });
  app.put("/api/beacons", checkOwnership.beacon, function(req, res) {
    db.Beacon.update(
      {
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        address: req.body.address,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        date: req.body.date
      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(results) {
      res.json(results);
    });
  });
  app.post("/api/beacons", function(req, res) {
    var newBeacon = req.body;
    newBeacon.UserId = req.user.id;
    googleMapsClient.geocode(
      {
        address: newBeacon.address
      },
      function(err, response) {
        if (!err) {
          newBeacon.address = response.json.results[0].formatted_address;
          newBeacon.latitude = response.json.results[0].geometry.location.lat;
          newBeacon.longitude = response.json.results[0].geometry.location.lng;
          db.Beacon.create(newBeacon).then(function(dbBeacon) {
            res.json(dbBeacon);
          });
        }
      }
    );
  });
};
