module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        meyersBriggs: DataTypes.STRING,
        description: DataTypes.STRING,
        img_url: DataTypes.STRING,
        // eventually add preference categories?
    });
    return User;
};  