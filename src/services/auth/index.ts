import * as bcrypt from 'bcrypt';
import { USER_STATUS } from '../../enums/users/constants';
import { IUser } from '../../interfaces';
import { HttpError } from '../../utils/httpError';
import { BaseModelService } from '../baseModel';
import { MailService } from '../mail';
import { TokenService } from '../token';
import { UserService } from '../user';
import { UsersKeysService } from '../usersKeys';

export class AuthService extends BaseModelService {

    async login(user: any): Promise<any> {
        const userService = new UserService();
        const tokenService = new TokenService();

        const dbUser: any = await userService.getUserByEmail(user.email);
        if (!dbUser) {
            throw new HttpError(401, 'User is unregistered', 'Access denied');
        }

        if (dbUser.user.status !== USER_STATUS.confirmed) {
            throw new HttpError(401, 'User status is not confirmed', 'Access denied');
        }

        const compared = await bcrypt.compare(user.password, dbUser.password);

        if (compared) {
            delete dbUser.dataValues.password;
            const token = await tokenService.generateToken({user: dbUser.dataValues}, +process.env.TOKEN_TIME);

            return {
                user: dbUser,
                token
            };
        }

        throw new HttpError(401, 'Bad password', 'Access denied');
    }

    async register(user: Exclude<IUser, 'status' | 'role' | 'disabled'>): Promise<{status: number}> {
        try {
            const userService = new UserService();
            const mailService = new MailService();
            const dbUser = await userService.getUserByEmail(user.email);

            UserService.checkExistUser(!!dbUser);

            user.password = await bcrypt.hash(user.password, +process.env.SALT_ROUNDS);
            const createdUser: IUser = (await userService.createUser(user)).dataValues;
            const dataSendMail = await mailService.generateDataRegMail(createdUser.id, createdUser.firstName, createdUser.email);

            mailService.sendMail(dataSendMail);

            return {
                status: 200
            };
        } catch (e) {
            throw new HttpError(500, JSON.stringify(e), 'Access denied');
        }
    }

    async confirmRegistration(id: number, key: string): Promise<boolean> {
        try {
            const userKeysService = new UsersKeysService();
            const userService = new UserService();
            const userKey = await userKeysService.getUserKey(key, id);

            if (userKey) {
                await userService.updateUser(id, {status: USER_STATUS.confirmed});
                await userKeysService.deleteUserKey(userKey.id);

                return true;
            }

            return false;
        } catch (e) {
            console.log('confirmRegistration', e);
        }
    }

}
