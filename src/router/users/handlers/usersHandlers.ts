import { UserService } from '../../../services/user';
// const StorageService = require('../../../services/storage');

export const createUser = async (ctx: any): Promise<void> => {
  try {
    const userService = new UserService();
    const newUser = ctx.request.body;
    ctx.response.body = await userService.createUser(newUser);
  } catch (e) {
    ctx.response.body = JSON.stringify(e);
    ctx.response.status = 500;
  }
};

export const deleteUser = async (ctx: any): Promise<void> => {
   try {
     const userService = new UserService();
     const { id } = ctx.params;
     ctx.response.body = await userService.deleteUser(+id);
   } catch (e) {
     ctx.response.body = JSON.stringify(e);
     ctx.response.status = 500;
   }
};

export const user = async (ctx: any): Promise<void> => {
  try {
    const userService = new UserService();
    const { id } = ctx.params;
    ctx.response.body = await userService.getUser(id);
  } catch (e) {
    ctx.response.body = JSON.stringify(e);
    ctx.response.status = 500;
  }
};

export const users = async (ctx: any): Promise<void> => {
  try {
    const userService = new UserService();
    ctx.response.body = await userService.getUsers();
  } catch (e) {
    ctx.response.body = JSON.stringify(e);
    ctx.response.status = 500;
  }
};

export const updateUser = async (ctx: any): Promise<void> => {
  try {
    const userService = new UserService();
    // const storageService = new StorageService();
    const { id } = ctx.params;
    const { body } = ctx.request;

    if (!ctx.file) {
      await userService.updateUser(id , body);
      ctx.response.body = await userService.getUser(id);
    }
  } catch (e) {
    ctx.response.body = JSON.stringify(e);
    ctx.response.status = 500;
  }
  // const file = await storageService.uploadFile(ctx.file, 'users-images/');
  //
  // body.imgId = file.id;
  //
  // await userService.updateUser(id, body);
  //
  // ctx.response.body = await userService.getUser(id);
};
