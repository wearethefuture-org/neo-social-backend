export interface IChat {
  id: number;
  name: string;
  description: string;
  logo_id: number;
  available: boolean;
  owner_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}
