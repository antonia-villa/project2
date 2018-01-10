'use strict';
module.exports = (sequelize, DataTypes) => {
  var tag = sequelize.define('tag', {
    content: DataTypes.STRING


  });
tag.associate = function (models) {
  models.tag.belongsToMany(models.contribution, { through: models.contribution_tag });;
};
  return tag;
};