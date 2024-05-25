const {DataTypes} = require('sequelize');

const db = require('../db/conn');

const Timeline = db.define('Timeline', {
  carId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    require: true,
  },
  initialDate: {
    type: DataTypes.DATE,
    allowNull: false,
    require: true
  },
  finalDate: {
    type: DataTypes.DATE,
    allowNull: false,
    require: true
  }
})

module.exports = Timeline