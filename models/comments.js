const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config.js');


const Comments = sequelize.define('Comments', {
    commentorEmail: {
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
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
          },
      },
});

module.exports = Comments;
