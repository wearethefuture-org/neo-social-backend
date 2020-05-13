module.exports = {
  up: (queryInterface, DataTypes) =>
    queryInterface.createTable('users_chats', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        field: 'user_id'
      },
      chatId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: 'chats',
          key: 'id'
        },
        field: 'chat_id'
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
    })
};
