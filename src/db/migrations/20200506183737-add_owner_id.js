'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('chats', 'owner_id', {
      type: Sequelize.BIGINT,
      allowNull: true,
      unique: true
    });
  }
};
