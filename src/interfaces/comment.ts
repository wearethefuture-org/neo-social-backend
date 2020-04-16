export interface IComment {
  id: number;
  message: string;
  userId: number;
  chat_id: number;
  file_id: number;
  createdAt: Date;
  updatedAt: Date;
}
