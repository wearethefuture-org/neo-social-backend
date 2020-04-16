import { IUserKey } from '../../interfaces';
import { generateRandomString } from '../../utils/generateRandomString';
import { BaseModelService } from '../baseModel';

export class UsersKeysService extends BaseModelService {
    async createUserKey(id: number): Promise<IUserKey> {
        const body = {
            userId: id,
            key: generateRandomString()
        };

        return this.model.usersKeys.create(body);
    }

    async getUserKey(key: string): Promise<IUserKey> {
        return this.model.usersKeys.findOne({
            where: {
                key
            }
        });
    }

    async deleteUserKey(id: number): Promise<number> {
        return this.model.usersKeys.destroy({
            where: {
                id
            }
        });
    }
}
