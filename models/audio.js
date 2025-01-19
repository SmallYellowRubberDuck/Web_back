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
  categories: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coverfile: {
    type: DataTypes.STRING,
    allowNull: true,        
},
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  authorEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
        isEmail: true,
    },
  },
  upload_date: {
    type: DataTypes.DATE,
  },
  categories: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
});

module.exports = Audio;
