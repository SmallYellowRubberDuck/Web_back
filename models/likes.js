const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config.js');


const Likes = sequelize.define('Likes', {
    likerEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    audioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      indexes: [
        {
          unique: true,
          fields: ['likerEmail', 'audioId'],
        },
      ],
  });

module.exports = Likes;