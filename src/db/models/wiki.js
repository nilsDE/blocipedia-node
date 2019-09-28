'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wiki = sequelize.define('Wiki', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    private: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {});
  Wiki.associate = function(models) {
    Wiki.belongsTo(models.Users, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    Wiki.hasMany(models.collaborator, {
      foreignKey: "wikiId",
      as: "collabs"
    })
  };
  return Wiki;
};