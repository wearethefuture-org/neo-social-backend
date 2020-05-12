import { body, path, query, request, summary, tags } from 'koa-swagger-decorator';

import { IChat } from '../interfaces';
import { ChatsService } from '../services/chats';
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
            // console.log(params);

            ctx.response.body = await chatsService.getChats(params);
        } catch (e) {
            // console.log(e);
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
}
