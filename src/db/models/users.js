'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: 'must be a valid email!' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING
    }
  }, {});
  Users.associate = function(models) {
    Users.hasMany(models.Wiki, {
      foreignKey: 'userId',
      as: 'wikis'
    });
  };  

  Users.prototype.isStandard = function() {
    return this.role === "standard";
  };

  Users.prototype.isAdmin = function() {
    return this.role === "admin";
  };

  Users.prototype.isPremium = function() {
    return this.role === "premium";
  };

  return Users;
};