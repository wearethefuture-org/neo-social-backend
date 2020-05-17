import { IChat } from '../../interfaces';
import { HttpError } from '../../utils/httpError';
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

    async deleteChat(id: number, ctx: any): Promise<any> {
        const Chat = await this.model.chats.findOne(
            {
                where: {
                    id
                }
            }
        );
        if (ctx.user.id !== Chat.ownerId){
            throw new HttpError(401, 'User is not owner', 'Access denied');
        }

        return this.model.chats.destroy({
            where: {
                id
            }
        });
    }

    async updateChat(id: number, newData: any, ctx: any): Promise<any> {
        const Chat = await this.model.chats.findOne(
            {
                where: {
                    id
                }
            }
        );
        if (ctx.user.id !== Chat.ownerId){
            throw new HttpError(401, 'User is not owner', 'Access denied');
        }

        return this.model.chats.update(newData, {
            where: {
                id
            }
        });
    }
}
