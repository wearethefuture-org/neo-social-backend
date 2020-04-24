import { IChat } from '../../interfaces';
import { BaseModelService } from '../baseModel';

export class ChatsService extends BaseModelService {
  async getChats(): Promise<IChat[]> {
    return this.model.chats.findAll({});
  }

  async getChat(name: string): Promise<IChat> {
    return this.model.chats.findOne(
      {
        where: {
          name
        }
      }
    );
  }

  async createChat(newChat: IChat): Promise<IChat> {
    return this.model.chats.create(newChat);
  }
}
