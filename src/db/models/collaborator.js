'use strict';
module.exports = (sequelize, DataTypes) => {
  var collaborator = sequelize.define('collaborator', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    wikiId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  collaborator.associate = function(models) {
    collaborator.belongsTo(models.Wiki, {
      foreignKey: "wikiId",
      onDelete: "CASCADE"
    });
    collaborator.belongsTo(models.Users, {
      foreingnKey: "userId",
      onDelete: "CASCADE"
    })
  };
  return collaborator;
};