'use strict';
module.exports = (sequelize, DataTypes) => {
  var collaborator = sequelize.define('collaborator', {
    userId: DataTypes.INTEGER,
    wikiId: DataTypes.INTEGER
  }, {});
  collaborator.associate = function(models) {
    // associations can be defined here
  };
  return collaborator;
};