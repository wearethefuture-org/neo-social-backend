import { body, request, summary, tags } from 'koa-swagger-decorator';
import { AuthService } from '../services/auth';
import { HttpServerError } from '../utils/httpError';

export class AuthRouter {
    @request('post', '/auth/login')
    @summary('User login')
    @tags(['Auth'])
    @body({
        email: { type: 'string', required: true },
        password: { type: 'string', required: true }
    })
    static async login(ctx: any): Promise<void> {
        try {
            const {email, password} = ctx.validatedBody;

            ctx.response.body = await new AuthService()
                .login({email, password});
        } catch (e) {
            throw new HttpServerError(e);
        }
    }

    @request('post', '/auth/register')
    @summary('User registration')
    @tags(['Auth'])
    @body({
        firstName: { type: 'string', required: true },
        lastName: { type: 'string', required: true },
        email: { type: 'string', required: true },
        password: { type: 'string', required: true },
        birthdayDate: { type: 'string', required: true }
    })
    static async register(ctx: any): Promise<void> {
        try {
            const user = ctx.validatedBody;

            ctx.response.status = await new AuthService()
                .register(user)
                .then(response => response.status);
        } catch (e) {
            throw new HttpServerError(e);
        }
    }

    @request('post', '/auth/confirm')
    @summary('User confirm')
    @tags(['Auth'])
    @body({
        id: { type: 'number', required: true },
        key: { type: 'string', required: true }
    })
    static async confirmRegistration(ctx: any): Promise<void> {
        try {
            const { id, key } = ctx.validatedBody;

            ctx.response.body = await new AuthService()
                .confirmRegistration(id, key);
        } catch (e) {
            throw new HttpServerError(e);
        }
    }
}
