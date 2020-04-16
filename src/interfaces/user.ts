import { USER_ROLE, USER_STATUS } from '../enums/users/constants';

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
  birthdayDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
