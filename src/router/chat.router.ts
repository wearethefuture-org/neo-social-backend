import { body, formData, path, query, request, summary, tags } from 'koa-swagger-decorator';
import { IChat } from '../interfaces';
import { ChatsService } from '../services/chats';
import { StorageService } from '../services/storage';
import { HttpServerError } from '../utils/httpError';

export class ChatRouter {
    @request('get', '/chats')
    @summary('Chat list')
    @tags(['Chat'])
    @query({
        limit: { type: 'number', required: false, example: 10 },
        offset: { type: 'number', required: false, example: 10 },
        isGlobal: { type: 'boolean', required: false, example: true }
    })
    static async getChats(ctx: any): Promise<void> {
        try {
            const chatsService = new ChatsService();
            const params = ctx.validatedQuery;

            ctx.response.body = await chatsService.getChats(params);
        } catch (e) {
            throw new HttpServerError(e);
        }
    }

    @request('get', '/chats/{id}')
    @summary('Get chat by id')
    @tags(['Chat'])
    @path({
        id: {type: 'number', required: true}
    })
    static async getChat(ctx: any): Promise<void> {
        try {
            const chatsService = new ChatsService();
            const {id} = ctx.validatedParams;

            ctx.response.body = await chatsService.getChat(id);
        } catch (e) {
            throw new HttpServerError(e);
        }
    }

    @request('post', '/chats')
    @summary('Create chat')
    @tags(['Chat'])
    @body({
        name: {type: 'string', required: true, example: 'John'},
        description: {type: 'string', required: false, example: 'Work chat'},
        logoId: {type: 'number', required: false, example: 545},
        available: {type: 'boolean', required: false, example: true},
        ownerId: {type: 'number', required: false, example: 1}
    })
    static async createChat(ctx: any): Promise<void> {
        try {
            const chatsService = new ChatsService();
            const newChat: IChat = ctx.validatedBody;

            ctx.response.body = await chatsService.createChat(newChat);
        } catch (e) {
            throw new HttpServerError(e);
        }
    }
    @request('delete', '/chats/{id}')
    @summary('Delete Chat by id')
    @tags(['Chat'])
    @path({
        id: {type: 'number', required: true}
    })
    static async deleteChat(ctx: any): Promise<void> {
        try {
            const chatsService = new ChatsService();
            const {id} = ctx.validatedParams;
            ctx.response.body = await chatsService.deleteChat(+id, ctx);
        } catch (e) {
            throw new HttpServerError(e);
        }
    }
    @request('put', '/chats/{id}')
    @summary('Update Chat by id')
    @tags(['Chat'])
    @path({
        id: {type: 'number', required: true}
    })
    @formData({
        file: {type: 'file', required: false, description: 'logo'}
    })
    @body({
        name: {type: 'string', required: false, example: 'John'},
        logo_id: {type: 'number', required: false, example: 4},
        description: {type: 'string', required: false, example: 'I am John Wick'},
        available: {type: 'boolean', required: false, example: 'true'}
    })
    static async updateChat(ctx: any): Promise<void> {
        try {
            const chatsService = new ChatsService();
            const {id} = ctx.validatedParams;
            const body = ctx.validatedBody;

            if (!ctx.file) {
                await chatsService.updateChat(id, body, ctx);
                ctx.response.body = await chatsService.getChat(id);

                return;
            }

            const storageService = new StorageService();
            const file = await storageService.uploadFile(ctx.file);

            await chatsService.updateChat(id, {logoId: file.id}, ctx);
            ctx.response.body = await chatsService.getChat(id);
        } catch (e) {
            throw new HttpServerError(e);
        }
    }
}
