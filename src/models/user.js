'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [7, 33],
        notEmpty: true,
      }
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    accountType: {
      type: DataTypes.ENUM('DOCTOR', 'PATIENT'),
      defaultValue: 'PATIENT',
      validate: {
        notEmpty: true,
      }
    },
    gender: {
      type: DataTypes.ENUM('MALE', 'FEMALE'),
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    birthday: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
  }, {});
  User.associate = function(models) {
    const { Doctor, Appointment } = models;
    User.hasOne(Doctor, { as: 'DoctorProfile' });
    User.belongsToMany(Appointment, { through: 'UserAppointment'});
  };
  return User;
};