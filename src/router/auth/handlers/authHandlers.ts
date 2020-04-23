import { AuthService } from '../../../services/auth';

export const login = async (ctx: any): Promise<void> => {
    try {
        const authService = new AuthService();

        const user = {
            email: ctx.request.body.email,
            password: ctx.request.body.password
        };

        ctx.response.body = await authService.login(user);
    } catch (e) {
        ctx.response.body = JSON.stringify(e);
        ctx.response.status = 502;
    }
};

export const register = async (ctx: any): Promise<void> => {
    try {
        const authService = new AuthService();
        const user = ctx.request.body;
        ctx.response.status = (await authService.register(user)).status;
    } catch (e) {
        ctx.response.body = JSON.stringify(e);
        ctx.response.status = 500;
    }

};

export const confirmRegistration = async (ctx: any): Promise<void> => {
    try {
        const authService = new AuthService();
        const { id, key } = ctx.request.body;
        ctx.response.body = await authService.confirmRegistration(id, key);
    } catch (e) {
        console.log('confirmRegistration', e);
    }
};
