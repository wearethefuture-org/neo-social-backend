import { IChat } from '../../../interfaces';
import { ChatsService } from '../../../services/chats';
import { HttpServerError } from '../../../utils/httpError';

export const getChats = async (ctx: any): Promise<void> => {
  try {
    const chatsService = new ChatsService();
    ctx.response.body = await chatsService.getChats();
  } catch (error) {
    throw new HttpServerError(error);
  }
};

export const getChat = async (ctx: any): Promise<void> => {
  try {
    const chatsService = new ChatsService();
    const { id } = ctx.params;
    ctx.response.body = await chatsService.getChat(id);
  } catch (error) {
    throw new HttpServerError(error);
  }
};

export const createChat = async (ctx: any): Promise<void> => {
  try {
    const chatsService = new ChatsService();
    const newChat: IChat = ctx.request.body;
    ctx.response.body = await chatsService.createChat(newChat);
  } catch (error) {
    throw new HttpServerError(error);
  }
};
