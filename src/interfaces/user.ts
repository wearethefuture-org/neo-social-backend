import { USER_ROLE, USER_STATUS } from '../enums/users/constants';
import { IChat } from './';

export interface IUser {
  id: number;
  avatarId?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: USER_STATUS;
  role: USER_ROLE;
  disabled: boolean;
  chats: IChat[];
  birthdayDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
