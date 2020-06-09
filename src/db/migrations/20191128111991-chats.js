module.exports = {
    up: (queryInterface, DataTypes) =>
    queryInterface.createTable('chats', {
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
            allowNull: false,
            field: 'available'
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
    down: queryInterface => queryInterface.dropTable('chats', {})
};
