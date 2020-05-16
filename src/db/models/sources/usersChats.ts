export default (sequelize: any, DataTypes: any) => {
  return sequelize.define(
    'usersChats',
    {
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
        defaultValue: sequelize.fn('NOW'),
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'updated_at'
      }
    },
    {
      tableName: 'users_chats',
      timestamps: false,
      createdAt: 'created_at',
      updatedAt: true
    }
  );
};
