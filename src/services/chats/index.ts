import { IChat } from '../../interfaces';
import { BaseModelService } from '../baseModel';

export class ChatsService extends BaseModelService {
    async getChats(params: {limit: number, offset: number, isGlobal: boolean}): Promise<IChat[]> {
        const { limit = 30, offset = 0, isGlobal = true } = params;
        const where = isGlobal ? {} : { ownerId: { [ this.model.Op.ne]: null } };

        return this.model.chats.findAll({
            where,
            limit,
            offset
        });
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
