'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Likes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      likerEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      audioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint('Likes', {
      fields: ['likerEmail', 'audioId'],
      type: 'unique',
      name: 'unique_liker_audio_pair',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Likes');
  },
};