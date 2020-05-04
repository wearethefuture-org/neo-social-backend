import * as Router from 'koa-router';
import { createChat, getChat, getChats } from './handlers/chatsHandlers';
import { IChat } from '../../interfaces';
import { ChatsService } from '../../services/chats';
import { HttpServerError } from '../../utils/httpError';
import { body, request, summary, tags, path } from 'koa-swagger-decorator';


export class ChatRouter {
  @request('get', '/chat')
  @summary('Chat list')
  @tags(['Chat'])
  static async getChats(ctx: any): Promise<void> {
      try {
        const chatsService = new ChatsService();
        ctx.response.body = await chatsService.getChats();
      } catch (e) {
          throw new HttpServerError(e);
      }
  }

  @request('get', '/chat/id')
  @summary('get chat by id')
  @tags(['Chat'])
  @path({ id: { type: 'string', required: true } })
  // @body({
  //   id: { type: 'string', required: true, example: '545' }
  // })
  static async getChat(ctx: any): Promise<void> {
  try {
    const chatsService = new ChatsService();
    const { id } = ctx.params;
    ctx.response.body = await chatsService.getChat(id);
  } catch (e) {
      throw new HttpServerError(e);
  }
}

  @request('post', '/chat')
  @summary('Create chat')
  @tags(['Chat'])
  @body({
    id: { type: 'string', required: true, example: '545' },
    name: { type: 'string', required: true, example: 'John' },
    description : { type: 'string', example: 'Work chat' },
    logoId: { type: 'string', example: '545' },
    available: { type: 'boolean', required: true, example: true }
  })
  static async createChat(ctx: any): Promise<void> {
    try {
      const chatsService = new ChatsService();
      const newChat: IChat = ctx.request.body;
      ctx.response.body = await chatsService.createChat(newChat);
    } catch (e) {
        throw new HttpServerError(e);
    }
}

  
}


// const commonChatsRouter = new Router();

// commonChatsRouter.get('/', getChats);
// commonChatsRouter.get('/:id', getChat);
// commonChatsRouter.post('/', createChat);

// export default commonChatsRouter.routes();
