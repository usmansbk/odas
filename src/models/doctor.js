'use strict';
module.exports = (sequelize, DataTypes) => {
  var Doctor = sequelize.define('Doctor', {
    email: {
      type: DataTypes.STRING,
    },
    firstname: {
      type: DataTypes.STRING,
    },
    surname: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.ENUM('MALE', 'FEMALE'),
    },
    birthday: {
      type: DataTypes.STRING,
    },
    degree: {
      type: DataTypes.STRING,
    },
    designation: {
      type: DataTypes.STRING,
    },
    experience: {
      type: DataTypes.STRING,
    },
    fee: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    country: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    speciality: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.STRING,
    },
    longitude: {
      type: DataTypes.STRING,
    },
    cl_name: {
      type: DataTypes.STRING,
    },
    cl_address: {
      type: DataTypes.STRING,
    },
    cl_phone: {
      type: DataTypes.STRING,
    },
    cl_fee: {
      type: DataTypes.STRING,
    },
    cl_facilities: {
      type: DataTypes.TEXT,
    },
  }, {});
  Doctor.associate = function(models) {
    const { Appointment } = models;
  };
  return Doctor;
};