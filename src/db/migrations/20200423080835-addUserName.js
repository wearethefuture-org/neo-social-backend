module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'user_name', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
  },

  down: (queryInterface, Sequelize) => {

  }
};
