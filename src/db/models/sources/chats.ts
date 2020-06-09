export default (sequelize: any, DataTypes: any) => {
    return sequelize.define(
        'chats',
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: 'id'
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'name'
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'description'
            },
            logoId: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'files',
                    key: 'id'
                },
                field: 'logo_id'
            },
            available: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: false,
                field: 'available'
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.fn('NOW'),
                field: 'created_at'
            },
            ownerId: {
              type: DataTypes.BIGINT,
              allowNull: true,
              field: 'owner_id'
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'updated_at'
            }
        },
        {
            tableName: 'chats',
            timestamps: false,
            createdAt: 'created_at',
            updatedAt: true
        }
    );
};
