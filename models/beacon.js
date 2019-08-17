module.exports = function(sequelize, DataTypes) {
  var Beacon = sequelize.define("Beacon", {
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.TEXT,
    address: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    startTime: DataTypes.TIME,
    date: DataTypes.DATE
  });
  return Beacon;
};
