'use strict';
module.exports = (sequelize, DataTypes) => {
  var Clinic = sequelize.define('Clinic', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    address: {
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
    latitude: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      }
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      }
    },
    fees: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    facilities: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
  }, {
    validate: {
      bothCoordsOrNone() {
        if ((this.latitude === null) !== (this.longitude === null)) {
          throw new Error('Require either both latitude or longitude or neither');
        }
      }
    }
  });
  Clinic.associate = function(models) {
    const { Doctor } = models;
    Clinic.hasMany(Doctor);
  };
  return Clinic;
};