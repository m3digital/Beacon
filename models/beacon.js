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
  Beacon.associate = function(models) {
    Beacon.hasMany(models.Comment, { onDelete: "cascade" });

    Beacon.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Beacon;
};
