const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config.js');

const Audio = sequelize.define('Audio', {
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER, // Продолжительность в секундах
    allowNull: false,
  },
  upload_date: {
    type: DataTypes.DATE,
  },
  categories: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
});

module.exports = Audio;
