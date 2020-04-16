module.exports = {
  up: (queryInterface, DataTypes) =>
    queryInterface.createTable('files', {
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
      type: {
          type: DataTypes.STRING,
          allowNull: true,
          field: 'name'
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'url'
      },
      // userId: {
      //   type: DataTypes.BIGINT,
      //   allowNull: true,
      //   references: {
      //       model: 'users',
      //       key: 'id'
      //   },
      //   field: 'user_id'
      // },
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
  down: queryInterface => queryInterface.dropTable('files', {})
};
