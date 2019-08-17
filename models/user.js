var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    meyersBriggs: DataTypes.STRING,
    description: DataTypes.STRING,
    imgURL: DataTypes.STRING
    // eventually add preference categories?
  });

  // These nifty little additions allow us to hash users' passwords as they enter them, while still being able to read them ourselves.
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  User.associate = function(models) {
    User.hasMany(models.Beacon, { onDelete: "cascade" });
    User.hasMany(models.Comment, { onDelete: "cascade" });
  };
  return User;
};
