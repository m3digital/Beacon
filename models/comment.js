module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    body: DataTypes.TEXT
  });
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Comment.belongsTo(models.Beacon, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Comment;
};
