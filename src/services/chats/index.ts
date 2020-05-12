import { IChat } from '../../interfaces';
import { BaseModelService } from '../baseModel';

export class ChatsService extends BaseModelService {
    async getChats(params: {limit: number, offset: number, isGlobal: boolean}): Promise<IChat[]> {
        const { limit, offset, isGlobal } = params;
        const where: any = {};

        if (isGlobal) {
            // tslint:disable-next-line:no-null-keyword
          where.ownerId = null;
        }else{
            where.ownerId = {
                // tslint:disable-next-line:no-null-keyword
                [this.model.Op.not]: null
            };
        }

        return this.model.chats.findAll({
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
