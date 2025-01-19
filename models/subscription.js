const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config.js');


const Subscription = sequelize.define('Subscription', {
    subscriberEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    authorEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['subscriberEmail', 'authorEmail'],
      },
    ],
  });

  module.exports = Subscription;
