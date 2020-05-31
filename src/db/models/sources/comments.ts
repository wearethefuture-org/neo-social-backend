export default (sequelize: any, DataTypes: any) => {
    return sequelize.define(
        'comments',
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: 'id'
            },
            message: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'message'
            },
            userId: {
                type: DataTypes.BIGINT,
                references: {
                    model: 'users',
                    key: 'id'
                },
                field: 'userId'
            },
            chatId: {
                type: DataTypes.BIGINT,
                references: {
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
                defaultValue: sequelize.fn('NOW'),
                field: 'created_at'
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'updated_at'
            },
            messageLikes: {
                type: DataTypes.BIGINT,
                allowNull: false,
                defaultValue: 0 ,
                field: 'Likes'
            },
            messageDislikes: {
                type: DataTypes.BIGINT,
                allowNull: false,
                defaultValue: 0 , 
                field: 'Dislikes'
            }
        },
        {
            tableName: 'comments',
            timestamps: false,
            createdAt: 'created_at',
            updatedAt: true
        }
        
    );
};
