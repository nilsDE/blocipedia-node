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
    }
  }, {});
  Users.associate = function(models) {
    Users.hasMany(models.Wiki, {
      foreignKey: 'userId',
      as: 'wikis'
    });
  };  
  return Users;
};