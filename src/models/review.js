'use strict';
module.exports = (sequelize, DataTypes) => {
  var Review = sequelize.define('Review', {
    manner: {
      type: DataTypes.ENUM('VERY BAD', 'BAD', 'OKAY', 'GOOD', 'VERY GOOD'),
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    waitingTime: {
      type: DataTypes.ENUM('VERY LONG', 'LONG', 'OKAY', 'FAST', 'VERY FAST'),
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    approved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
  }, {});
  Review.associate = function(models) {
    const { Doctor, User } = models;
    Review.belongsTo(Doctor);
    Review.belongsTo(User, { as: 'Patient'})
  };
  return Review;
};