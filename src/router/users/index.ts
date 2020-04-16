import * as Router from 'koa-router';
import { createUser, deleteUser, updateUser, user, users } from './handlers/usersHandlers';

const userRouter = new Router();

userRouter.get('/', users);
userRouter.get('/:id', user);
userRouter.post('/', createUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

// tslint:disable-next-line:no-default-export
export default userRouter.routes();
