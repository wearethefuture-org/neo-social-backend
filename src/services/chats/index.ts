import { IChat } from '../../interfaces';
import { BaseModelService } from '../baseModel';

export class ChatsService extends BaseModelService {
    async getChats(params: {limit: number, offset: number, isGlobal: boolean}): Promise<IChat[]> {
        const { limit, offset, isGlobal } = params;
        const where: any = {};

        // tslint:disable-next-line:prefer-conditional-expression
        if (isGlobal) {
            // tslint:disable-next-line:no-null-keyword
          where.ownerId = null;
        } else{
            where.ownerId = {[this.model.Op.eq]: null};
        }

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
