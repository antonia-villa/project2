'use strict';
module.exports = (sequelize, DataTypes) => {
  var contribution_tag = sequelize.define('contribution_tag', {
    contributionId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return contribution_tag;
};