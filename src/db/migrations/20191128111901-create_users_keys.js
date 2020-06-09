module.exports = {
  up: (queryInterface, DataTypes) =>
    queryInterface.createTable('users_keys', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        field: 'user_id'
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'key'
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'key'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
        field: 'updated_at'
      }
    }),

  down: queryInterface => queryInterface.dropTable('users_keys', {})
};
