const Promise = require('bluebird');
const bcrypt = require('bcrypt');
// import * as faker from 'faker';
// import { Model } from '../models/index';

const users = [
  {
      first_name: 'superadmin',
      last_name: 'superadmin',
      email: 'superadmin@gmail.com',
      password: 'test',
      status: 'confirmed',
      role: 'superadmin',
      disabled: false,
      birthday_date: new Date('January 31 1996 00:00'),
  },
  // {
  //     firstName: 'admin',
  //     lastName: 'admin',
  //     email: 'admin@gmail.com',
  //     password: '111111',
  //     status: 'confirmed',
  //     role: 'admin',
  //     disabled: false,
  //     dateBirthday: new Date('January 31 1996 00:00'),
  // },
  // {
  //     firstName: 'user',
  //     lastName: 'user',
  //     email: 'user@gmail.com',
  //     password: '111111',
  //     status: 'confirmed',
  //     role: 'user',
  //     disabled: false,
  //     img: 'https://uybor.uz/borless/uybor/img/user-images/user_no_photo_300x300.png',
  //     dateBirthday: new Date('January 31 1996 00:00'),
  // }
];

module.exports = {
  up: async (queryInterface) => {
    await Promise.each(users, async user => {
      user.password = await bcrypt.hash(user.password, +process.env.SALT_ROUNDS);

      await queryInterface.bulkInsert('users', [user]);
      // try {
      //   await Model.users.create(user);
      // } catch (error) {
      //   console.log(error.message);
      // }
    });

    // const amount = 100;
    // const statuses = ['invited', 'pending', 'confirmed'];
    // const roles = ['user', 'admin', 'superadmin'];
    //
    // for (let i = 0;i < amount;i++) {
    //   const user = {
    //     firstName: faker.name.firstName(),
    //     lastName: faker.name.lastName(),
    //     email: faker.internet.email(),
    //     password: faker.internet.password(),
    //     status: statuses[faker.random.number(2)],
    //     role: roles[faker.random.number(2)],
    //     disabled: faker.random.boolean(),
    //     img: faker.image.avatar(),
    //     dateBirthday: faker.date.past()
    //   };
    //
    //   try {
    //     await model.users.create(user);
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // }
  },

  down: async () => {
    return Model.users.truncate({
      restartIdentity: true,
      cascade: true
    });
  }
};
