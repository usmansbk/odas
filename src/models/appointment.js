'use strict';
module.exports = (sequelize, DataTypes) => {
  var Appointment = sequelize.define('Appointment', {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        notEmpty: true,
      }
    },
    caseType: {
      type: DataTypes.ENUM('OLD', 'NEW'),
    },
    day: {
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
    phone: {
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
    confirm: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    const { Doctor, Clinic, User } = models;
    Appointment.belongsTo(Doctor);
    Appointment.belongsTo(Clinic);
    Appointment.belongsTo(User, { as: 'Patient'});
  };
  return Appointment;
};