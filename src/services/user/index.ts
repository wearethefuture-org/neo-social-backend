import { IUser } from '../../interfaces';
import { HttpError } from '../../utils/httpError';
import { BaseModelService } from '../baseModel';

export class UserService extends BaseModelService {

  static checkExistUser(isUser: boolean): never | void {
    if (isUser) {
      throw new HttpError(409, 'User has already registered', 'CAN_NOT_REGISTER');
    }
  }

  async getUsers(): Promise<void> {
    return this.model.users.findAll({});
  }

  async getUser(id: number): Promise<any> {
    return this.model.users.findOne({
      where: {
        id
      }
    });
  }

  async getUserByEmail(email: string): Promise<IUser> {
    return this.model.users.findOne({
      where: {
        email
      }
    });
  }

  async createUser(user: object): Promise<{dataValues: IUser}> {
    return this.model.users.create(user);
  }

  async updateUser(id: number, newData: any): Promise<void> {
    return this.model.users.update(newData, {
      where: {
        id
      }
    });
  }

  async deleteUser(id: number): Promise<void> {
    return this.model.users.destroy({
      where: {
        id
      }
    });
  }
}
