module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    body: DataTypes.TEXT
  });
  return Comment;
};
