const { DataTypes } = require('sequelize');

const db = require('../db/conn');

// Carro

const Car = db.define('Car', {
  model: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true
  },
  rentPrice: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    require: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true
  },
});

module.exports = Car