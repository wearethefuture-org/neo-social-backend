import { IUser } from './';

export interface IChat {
  id: number;
  name: string;
  description: string;
  logo_id: number;
  available: boolean;
  owner_id: string;
  user: IUser;
  createdAt?: Date;
  updatedAt?: Date;
}
