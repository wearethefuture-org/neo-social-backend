module.exports = {
  up: (queryInterface, DataTypes) =>
    queryInterface.createTable('comments', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },
      message:{
        type: DataTypes.STRING,
        allowNull: false,
        field: 'message'
      },
      userId:{
        type: DataTypes.BIGINT,
        references:{
          model: 'users',
          key: 'id'
        },
        field: 'user_id'
      },
      chatId:{
        type: DataTypes.BIGINT,
        references:{
          model: 'chats',
          key: 'id'
        },
        field: 'chat_id'
      },
      fileId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
            model: 'files',
            key: 'id'
        },
        field: 'file_id'
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
      },
      likes: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: 0,
        field: 'likes'
    },
    dislikes: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: 0,
        field: 'dislikes'
    }
    }),
  down: queryInterface => queryInterface.dropTable('comments', {})
};
