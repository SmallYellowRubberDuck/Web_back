'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Subscriptions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      subscriberEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      authorEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint('Subscriptions', {
      fields: ['subscriberEmail', 'authorEmail'],
      type: 'unique',
      name: 'unique_subscriber_author_pair',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Subscriptions');
  },
};