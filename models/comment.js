'use strict';
module.exports = (sequelize, DataTypes) => {
  var comment = sequelize.define('comment', {
    name: DataTypes.STRING,
    content: {
      type: DataTypes.STRING,
      validate: {
        len:{
          args:[2,200],
          msg: "Comment must be at least 2 characters in length and less than 200."
        }
      }
    },
    contributionId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.comment.belongsTo(models.contribution);
      }
    }
  });
  return comment;
};