'use strict';
module.exports = (sequelize, DataTypes) => {
  var contribution = sequelize.define('contribution', {
    title: DataTypes.STRING,
    content: {
      type: DataTypes.STRING,
      validate: {
        len:{
          args:[2,500],
          msg: "Contribution must be at least 2 characters in length and less than 500."
        }
      }
    },
    userId: DataTypes.INTEGER
});
contribution.associate = function (models) {
    models.contribution.belongsTo(models.user);
    models.contribution.belongsToMany(models.tag, {through: models.contribution_tag });
};
  return contribution;
};
