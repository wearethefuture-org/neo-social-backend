import { IChat } from '../../interfaces';
import { BaseModelService } from '../baseModel';

export class ChatsService extends BaseModelService {
    async getChats(): Promise<IChat[]> {
        return this.model.chats.findAll({});
    }

    async getChat(id: number): Promise<IChat> {
        return this.model.chats.findOne(
            {
                where: {
                    id
                },
                include: [
                    {
                        model: this.model.users,
                        as: this.model.aliases.chats.owner,
                        attributes: {
                            exclude: ['password']
                        }
                    },
                    {
                      model: this.model.users,
                      as: this.aliases.chats.usersInChats,
                      attributes: {
                        exclude: ['password']
                      }
                    }
                ]
            }
        );
    }

    async createChat(newChat: IChat): Promise<IChat> {
        return this.model.chats.create(newChat);
    }
}
