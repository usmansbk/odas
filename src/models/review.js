'use strict';
module.exports = (sequelize, DataTypes) => {
  var Review = sequelize.define('Review', {
    rating: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    date: {
      type: DataTypes.DATE,
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
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
  }, {});
  Review.associate = function(models) {
    const { Doctor, Clinic, User } = models;
    Review.belongsTo(Doctor);
    Review.belongsTo(Clinic);
    Review.belongsTo(User, { as: 'Patient'})
  };
  return Review;
};