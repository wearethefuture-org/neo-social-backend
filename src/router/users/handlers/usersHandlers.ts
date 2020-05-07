import { StorageService } from '../../../services/storage';
import { UserService } from '../../../services/user';
import { HttpServerError } from '../../../utils/httpError';

export const createUser = async (ctx: any): Promise<void> => {
    try {
        const userService = new UserService();
        const newUser = ctx.request.body;
        ctx.response.body = await userService.createUser(newUser);
    } catch (e) {
        throw new HttpServerError(e);
    }
};

export const deleteUser = async (ctx: any): Promise<void> => {
    try {
        const userService = new UserService();
        const {id} = ctx.params;
        ctx.response.body = await userService.deleteUser(+id);
    } catch (e) {
        throw new HttpServerError(e);
    }
};

export const user = async (ctx: any): Promise<void> => {
    try {
        const userService = new UserService();
        const {id} = ctx.params;
        ctx.response.body = await userService.getUser(id);
    } catch (e) {
        throw new HttpServerError(e);
    }
};

export const users = async (ctx: any): Promise<void> => {
    try {
        const userService = new UserService();
        ctx.response.body = await userService.getUsers();
    } catch (e) {
        throw new HttpServerError(e);
    }
};

export const updateUser = async (ctx: any): Promise<void> => {
    try {
        const userService = new UserService();
        const storageService = new StorageService();
        const {id} = ctx.params;
        const {body} = ctx.request;

        if (!ctx.file) {
            await userService.updateUser(id, body);
            ctx.response.body = await userService.getUser(id);

            return;
        }

        const file = await storageService.uploadFile(ctx.file);

        body.avatarId = file.id;

        await userService.updateUser(id, body);
        ctx.response.body = await userService.getUser(id);
    } catch (e) {
        throw new HttpServerError(e);
    }
};
