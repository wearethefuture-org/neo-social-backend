module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'user_name', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
    });
  },

  down: (queryInterface, Sequelize) => {

  }
};
