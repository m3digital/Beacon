var db = require("../models");
var googleMapsClient = require("@google/maps").createClient({
  key: process.env.keyskeys
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
  app.post("/api/beacons", function(req, res) {
    var newBeacon = req.body;
    newBeacon.UserId = req.user.id;
    googleMapsClient.geocode(
      {
        address: newBeacon.address
      },
      function(err, response) {
        if (!err) {
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
