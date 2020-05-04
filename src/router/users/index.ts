import * as Router from 'koa-router';
import { UserService } from '../../services/user';
import { HttpServerError } from '../../utils/httpError';
import { createUser, deleteUser, updateUser, user, users } from './handlers/usersHandlers';
import { body, request, summary, tags, path } from 'koa-swagger-decorator';

export class UserRouter {
  @request('post', '/user')
  @summary('Create User')
  @tags(['User'])
  @body({
    avatar_id: { type: 'string', example: '545' },
    userName: { type: 'string', required: true, example: 'Swagger' },
    firstName: { type: 'string', required: true, example: 'John' },
    lastName: { type: 'string', required: true, example: 'Smith' },
    email: { type: 'string', required: true, example: 'Smith@google.com' },
    password: { type: 'string', required: true, example: 'Smith33255' },
    birthdayDate: { type: 'string', required: true, example: '01/12/1983' },
  })
  static async createUser(ctx: any): Promise<void> {
      try {
        const userService = new UserService();
        const newUser = ctx.request.body;
        ctx.response.body = await userService.createUser(newUser);
      } catch (e) {
          throw new HttpServerError(e);
      }
  }

  @request('delete', '/user/id')
  @summary('Delete User by id')
  @tags(['User'])
  @path({ id: { type: 'string', required: true } })
  static async deleteUser(ctx: any): Promise<void> {
      try {
        const userService = new UserService();
        const { id } = ctx.params;
        ctx.response.body = await userService.deleteUser(+id);
      } catch (e) {
          throw new HttpServerError(e);
      }
  }
  
  @request('get', '/user/id')
  @summary('Get User by id')
  @tags(['User'])
  @path({ id: { type: 'number', required: true } })
  static async user(ctx: any): Promise<void> {
      try {
        const userService = new UserService();
        const { id } = ctx.params;
        ctx.response.body = await userService.getUser(id);
      } catch (e) {
          throw new HttpServerError(e);
      }
  }

  @request('get', '/user')
  @summary('Get User list')
  @tags(['User'])
  static async users(ctx: any): Promise<void> {
      try {
        const userService = new UserService();
        ctx.response.body = await userService.getUsers();
      } catch (e) {
          throw new HttpServerError(e);
      }
  }

  @request('put', '/user/id')
  @summary('Update User by id')
  @tags(['User'])
  @path({ id: { type: 'string', required: true } })
  @body({
    id: { type: 'string', example: '545' },
    avatar_id: { type: 'string', example: '545' },
    userName: { type: 'string', example: 'Swagger' },
    firstName: { type: 'string', example: 'John' },
    lastName: { type: 'string', example: 'Smith' },
    email: { type: 'string', example: 'Smith@google.com' },
    password: { type: 'string', example: 'Smith33255' },
    birthdayDate: { type: 'string', example: '01/12/1983' },
    status: { type: 'string', example: 'invited pending confirmed' },
    role: { type: 'string', example: 'user admin superadmin' },
    disabled: { type: 'boolean', example: 'true' }
  })
  static async updateUser(ctx: any): Promise<void> {
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
          throw new HttpServerError(e);
      }
  }
}





// const userRouter = new Router();

// userRouter.get('/', users);
// userRouter.get('/:id', user);
// userRouter.post('/', createUser);
// userRouter.put('/:id', updateUser);
// userRouter.delete('/:id', deleteUser);

// // tslint:disable-next-line:no-default-export
// export default userRouter.routes();
