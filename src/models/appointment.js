'use strict';
module.exports = (sequelize, DataTypes) => {
  var Appointment = sequelize.define('Appointment', {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'CONFIRMED', 'CANCELLED'),
      defaultValue: 'PENDING',
      validate: {
        notEmpty: true,
      }
    },
    visited: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        notEmpty: true,
      }
    },
  }, {});
  Appointment.associate = function(models) {
    const { Doctor, User } = models;
    Appointment.belongsTo(User, { as: 'Patient'});
    Appointment.belongsTo(User, { as: 'Doctor' });
  };
  return Appointment;
};