export const relations = (db: any): void => {
  db.chats.hasMany(db.comments, {
    onDelete: 'cascade',
    field: 'chat_id',
    targetKey: 'id',
    foreignKey: 'chatId'
  });

  db.users.hasMany(db.chats, {
    onDelete: 'cascade',
    field: 'owner_id',
    targetKey: 'id',
    foreignKey: 'ownerId'
  });

  db.chats.belongsTo(db.users, {
    as: db.aliases.chats.owner,
    onDelete: 'cascade',
    field: 'owner_id',
    targetKey: 'id',
    foreignKey: 'ownerId'
  });

  db.users.belongsTo(db.files, {
    as: db.aliases.users.files,
    foreignKey: 'avatarId'
  });
  // console.log('db.users', typeof db.users);
  // console.log('db.usersChats', typeof db.usersChats);
  db.users.belongsToMany(db.chats, {
    as: db.aliases.users.chatsAtUsers,
    field: 'user_id',
    foreignKey: 'user_id',
    through: db.usersChats
  });

  db.chats.belongsToMany(db.users, {
    as: db.aliases.chats.usersInChats,
    field: 'chat_id',
    foreignKey: 'chat_id',
    through: db.usersChats
  });

  // db.categories.hasMany(db.subCategories, {
  //   as: db.aliases.categories.subCategories,
  //   field: 'category_id',
  //   targetKey: 'id',
  //   foreignKey: 'categoryId'
  // });
  // db.subCategories.belongsTo(db.categories, {
  //   as: db.aliases.subCategories.categories,
  //   field: 'category_id',
  //   targetKey: 'id',
  //   foreignKey: 'categoryId',
  //   onDelete: 'CASCADE'
  // });
  //
  // db.subCategories.hasMany(db.products, {
  //   as: db.aliases.subCategories.products,
  //   field: 'sub_category_id',
  //   targetKey: 'id',
  //   foreignKey: 'subCategoryId'
  // });
  // db.products.belongsTo(db.subCategories, {
  //   as: db.aliases.products.subCategories,
  //   field: 'sub_category_id',
  //   targetKey: 'id',
  //   foreignKey: 'subCategoryId',
  //   onDelete: 'CASCADE'
  // });
  //
  // db.products.hasMany(db.characteristicsValues, {
  //   as: db.aliases.products.characteristicsValues,
  //   field: 'product_id',
  //   targetKey: 'id',
  //   foreignKey: 'productId'
  // });
  // db.characteristicsValues.belongsTo(db.products, {
  //   as: db.aliases.characteristicsValues.products,
  //   field: 'product_id',
  //   targetKey: 'id',
  //   foreignKey: 'productId',
  //   onDelete: 'CASCADE'
  // });
  //
  // db.products.hasOne(db.files, {
  //   as: db.aliases.products.previewImage,
  //   foreignKey: 'oneProductId'
  // });
  //
  // db.products.hasMany(db.files, {
  //   as: db.aliases.products.images,
  //   field: 'many_product_id',
  //   targetKey: 'id',
  //   foreignKey: 'manyProductId'
  // });
  // db.files.belongsTo(db.products, {
  //   as: db.aliases.products.products,
  //   field: 'many_product_id',
  //   targetKey: 'id',
  //   foreignKey: 'manyProductId',
  //   onDelete: 'CASCADE'
  // });
  //
  // db.subCategories.belongsToMany(db.characteristicsSettings, {
  //   as: db.aliases.subCategories.characteristicsSettings,
  //   through: 'subCategoryCharacteristics',
  //   foreignKey: 'sub_category_id'
  // });
  // db.characteristicsSettings.belongsToMany(db.subCategories, {
  //   as: db.aliases.characteristicsSettings.subCategories,
  //   through: 'subCategoryCharacteristics',
  //   foreignKey: 'characteristics_settings_id'
  // });
  //
  // db.characteristicsSettings.hasMany(db.characteristicsValues, {
  //   as: db.aliases.characteristicsSettings.characteristicsValues,
  //   field: 'characteristic_setting_id',
  //   targetKey: 'id',
  //   foreignKey: 'characteristicSettingId'
  // });
  // db.characteristicsValues.belongsTo(db.characteristicsSettings, {
  //   as: db.aliases.characteristicsValues.characteristicsSettings,
  //   field: 'characteristic_setting_id',
  //   targetKey: 'id',
  //   foreignKey: 'characteristicSettingId',
  //   onDelete: 'CASCADE'
  // });

  // db.users.hasMany(db.usersKeys, {
  //   as: db.aliases.users.usersKeys,
  //   field: 'user_id',
  //   targetKey: 'id',
  //   foreignKey: 'userId'
  // });
  // db.usersKeys.belongsTo(db.users, {
  //   as: db.aliases.usersKeys.users,
  //   field: 'user_id',
  //   targetKey: 'id',
  //   foreignKey: 'userId',
  //   onDelete: 'CASCADE'
  // });

  // db.users.hasMany(db.usersForgotPasswords, {
  //   as: db.aliases.users.usersForgotPasswords,
  //   field: 'user_id',
  //   targetKey: 'id',
  //   foreignKey: 'userId'
  // });
  // db.usersForgotPasswords.belongsTo(db.users, {
  //   as: db.aliases.usersForgotPasswords.users,
  //   field: 'user_id',
  //   targetKey: 'id',
  //   foreignKey: 'userId',
  //   onDelete: 'CASCADE'
  // });
  // db.users.hasMany(db.comments, {
  //   as: db.aliases.users.comments,
  //   field: 'user_id',
  //   targetKey: 'id',
  //   foreignKey: 'userId'
  // });
  // db.comments.belongsTo(db.users, {
  //   as: db.aliases.comments.users,
  //   field: 'user_id',
  //   targetKey: 'id',
  //   foreignKey: 'userId',
  //   onDelete: 'CASCADE'
  // });
  // db.products.hasMany(db.comments, {
  //   as: db.aliases.products.comments,
  //   field: 'product_id',
  //   targetKey: 'id',
  //   foreignKey: 'productId'
  // });
  // db.comments.belongsTo(db.products, {
  //   as: db.aliases.comments.product,
  //   targetKey: 'id',
  //   foreignKey: 'productId',
  //   onDelete: 'CASCADE'
  // });

};
