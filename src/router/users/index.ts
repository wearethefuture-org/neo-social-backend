import { body, path, request, summary, tags } from 'koa-swagger-decorator';
import { UserService } from '../../services/user';
import { HttpServerError } from '../../utils/httpError';

export class UserRouter {
    @request('get', '/users')
    @summary('Get User list')
    @tags([ 'User' ])
    static async users(ctx: any): Promise<void> {
        try {
            const userService = new UserService();

            ctx.response.body = await userService.getUsers();
        } catch (e) {
            throw new HttpServerError(e);
        }
    }

    @request('get', '/users/{id}')
    @summary('Get User by id')
    @tags([ 'User' ])
    @path({
        id: { type: 'number', required: true }
    })
    static async user(ctx: any): Promise<void> {
        try {
            const userService = new UserService();
            const { id } = ctx.validatedParams;

            ctx.response.body = await userService.getUser(id);
        } catch (e) {
            throw new HttpServerError(e);
        }
    }

    @request('post', '/users')
    @summary('Create User')
    @tags([ 'User' ])
    @body({
        userName: { type: 'string', required: true, example: 'Swagger' },
        firstName: { type: 'string', required: true, example: 'John' },
        lastName: { type: 'string', required: true, example: 'Smith' },
        birthdayDate: { type: 'date', required: true,  example: 1983 - 11 - 22 },
        email: { type: 'string', required: true, example: 'Smith@google.com' },
        password: { type: 'string', required: true, example: 'Smith33255' },
        disabled: { type: 'boolean', required: false,  example: 'true' },
        id: { type: 'number', required: false, example: 545 },
        avatar_id: { type: 'number', required: false,  example: 545 },
        status: { type: 'string', required: false,  example: 'invited pending confirmed' },
        role: { type: 'string', required: false,  example: 'user admin superadmin' }
    })
    static async createUser(ctx: any): Promise<void> {
        try {
            const userService = new UserService();
            const newUser = ctx.validatedBody;

            ctx.response.body = await userService.createUser(newUser);
        } catch (e) {
            throw new HttpServerError(e);
        }
    }

    @request('put', '/users/{id}')
    @summary('Update User by id')
    @tags([ 'User' ])
    @path({
        id: { type: 'number', required: true }
    })
    @body({
        id: { type: 'number', required: false, example: 545 },
        avatar_id: { type: 'number', required: false,  example: 545 },
        userName: { type: 'string', required: false,  example: 'Swagger' },
        firstName: { type: 'string', required: false,  example: 'John' },
        lastName: { type: 'string', required: false,  example: 'Smith' },
        email: { type: 'string', required: false,  example: 'Smith@google.com' },
        password: { type: 'string', required: false,  example: 'Smith33255' },
        birthdayDate: { type: 'date', required: false,  example: 1983 - 11 - 22 },
        status: { type: 'string', required: false,  example: 'invited pending confirmed' },
        role: { type: 'string', required: false,  example: 'user admin superadmin' },
        disabled: { type: 'boolean', required: false,  example: 'true' }
    })
    static async updateUser(ctx: any): Promise<void> {
        try {
            const userService = new UserService();
            const { id } = ctx.validatedParams;
            const { body } = ctx.validatedBody;

            if (!ctx.file) {
                await userService.updateUser(id, body);
                ctx.response.body = await userService.getUser(id);
            }
        } catch (e) {
            throw new HttpServerError(e);
        }
    }

    @request('delete', '/users/{id}')
    @summary('Delete User by id')
    @tags([ 'User' ])
    @path({
        id: { type: 'number', required: true }
    })
    static async deleteUser(ctx: any): Promise<void> {
        try {
            const userService = new UserService();
            const { id } = ctx.validatedParams;

            ctx.response.body = await userService.deleteUser(+id);
        } catch (e) {
            throw new HttpServerError(e);
        }
    }
}
