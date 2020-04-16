import { IChat } from '../../../interfaces';
import { ChatsService } from '../../../services/chats';

export const getChats = async (ctx: any): Promise<void> => {
  try {
    const chatsService = new ChatsService();
    ctx.response.body = await chatsService.getChats();
  } catch (error) {
    ctx.response.body = 500;
  }
};

export const getChat = async (ctx: any): Promise<void> => {
  try {
    const chatsService = new ChatsService();
    const { name } = ctx.params;
    ctx.response.body = await chatsService.getChat(name);
  } catch (error) {
    ctx.response.body = 500;
  }
};

export const createChat = async (ctx: any): Promise<void> => {
  try {
    const chatsService = new ChatsService();
    const newChat: IChat = ctx.request.body;
    ctx.response.body = await chatsService.createChat(newChat);
  } catch (error) {
    ctx.response.body = 500;
  }
};
