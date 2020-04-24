import * as Router from 'koa-router';

import authRouter from './auth';
import  userRouter from './users';
import commonChatsRouter from './chats';

const commonRouter = new Router();

commonRouter.use('/users', userRouter);
commonRouter.use('/auth', authRouter);
commonRouter.use('/chats', commonChatsRouter);

// tslint:disable-next-line:no-default-export
export default commonRouter.routes();
