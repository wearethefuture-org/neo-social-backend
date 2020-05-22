import { body, request, summary, tags } from 'koa-swagger-decorator';

import { AuthService } from '../services/auth';
import { HttpServerError } from '../utils/httpError';
import { SuccessResponse } from '../utils/successResponse';

export class AuthRouter {
    @request('post', '/auth/login')
    @summary('User login')
    @tags(['Auth'])
    @body({
        email: {type: 'string', required: true, example: 'admin@gmail.com'},
        password: {type: 'string', required: true, example: 'test'}
    })
    static async login(ctx: any): Promise<void> {
        try {
            const {email, password} = ctx.validatedBody;
            const result = await new AuthService.login({email, password});
            ctx.response.body = new SuccessResponse(200, 'User is logged in', 'Access permitted');
            ctx.response.body = result;
        } catch (e) {
            throw new HttpServerError(e);
        }
    }

    @request('post', '/auth/register')
    @summary('User registration')
    @tags(['Auth'])
    @body({
        firstName: {type: 'string', required: true},
        lastName: {type: 'string', required: true},
        userName: {type: 'string', required: true},
        email: {type: 'string', required: true},
        password: {type: 'string', required: true},
        birthdayDate: {type: 'string', required: true}
    })
    static async register(ctx: any): Promise<void> {
        try {
            const user = ctx.validatedBody;
            const result = await new AuthService.register(user);
            ctx.response.body = new SuccessResponse(200, 'User is registered', 'Access permitted');
            ctx.response.body = result;
        } catch (e) {
            throw new HttpServerError(e);
        }
    }

    @request('post', '/auth/confirm')
    @summary('User confirm')
    @tags(['Auth'])
    @body({
        id: {type: 'number', required: true},
        key: {type: 'string', required: true}
    })
    static async confirmRegistration(ctx: any): Promise<void> {
        try {
            const {id, key} = ctx.validatedBody;
            const result = await new AuthService.confirmRegistration(id, key);
            ctx.response.body = new SuccessResponse(200, 'Registration is confirmed', 'Access permitted');
            ctx.response.body = result;
        } catch (e) {
            throw new HttpServerError(e);
        }
    }
}
