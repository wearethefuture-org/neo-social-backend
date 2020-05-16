import { IUser } from '../../interfaces';
import { HttpError } from '../../utils/httpError';
import { BaseModelService } from '../baseModel';

export class UserService extends BaseModelService {
    static checkExistUser(isUser: boolean): never | void {
        if (isUser) {
            throw new HttpError(409, 'User has already registered', 'CAN_NOT_REGISTER');
        }
    }

    async getUsers(): Promise<IUser> {
        return this.model.users.findAll({
            attributes: {
                exclude: ['password']
            }
        });
    }

    async getUser(id: number): Promise<IUser> {
        return this.model.users.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['password']
            },
            include: [
                {
                    model: this.model.chats
                },
                {
                    model: this.model.files,
                    as: this.aliases.users.files
                },
                {
                    model: this.model.chats,
                    as: this.aliases.users.chatsAtUsers
                }
            ]
        });
    }

    async getUserByEmail(email: string): Promise<IUser> {
        return this.model.users.findOne({
            where: {
                email
            }
        });
    }

    async createUser(user: object): Promise<{ dataValues: IUser }> {
        return this.model.users.create(user);
    }

    async updateUser(id: number, newData: any): Promise<any> {
        return this.model.users.update(newData, {
            where: {
                id
            }
        });
    }

    async deleteUser(id: number): Promise<any> {
        return this.model.users.destroy({
            where: {
                id
            }
        });
    }
}
