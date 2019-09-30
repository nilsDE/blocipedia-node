'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
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
  User.associate = function(models) {
    User.hasMany(models.Wiki, {
      foreignKey: 'userId',
      as: 'wikis'
    });
    User.hasMany(models.Collaborator, {
      foreignKey: "userId",
      as: "collaborators"
    })
  };  

  User.prototype.isStandard = function() {
    return this.role === "standard";
  };

  User.prototype.isAdmin = function() {
    return this.role === "admin";
  };

  User.prototype.isPremium = function() {
    return this.role === "premium";
  };

  return User;
};