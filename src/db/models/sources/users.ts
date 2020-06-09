export default (sequelize: any, DataTypes: any) => {
    return sequelize.define(
        'users',
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: 'id'
            },
            avatarId: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'files',
                    key: 'id'
                },
                field: 'avatar_id'
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'first_name'
            },
            userName: {
              type: DataTypes.STRING,
              allowNull: false,
              unique: true,
              field: 'user_name'
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'last_name'
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                field: 'email'
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'password'
            },
            status: {
                type: DataTypes.ENUM('invited', 'pending', 'confirmed'),
                allowNull: false,
                defaultValue: 'pending',
                field: 'status'
            },
            role: {
                type: DataTypes.ENUM('user', 'admin', 'superadmin'),
                allowNull: false,
                defaultValue: 'user',
                field: 'role'
            },
            disabled: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
                field: 'disabled'
            },
            birthdayDate: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'birthday_date'
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
            tableName: 'users',
            timestamps: false,
            createdAt: 'created_at',
            updatedAt: true
        }
    );
};
