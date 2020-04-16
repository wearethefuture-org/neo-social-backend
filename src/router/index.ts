import * as Router from 'koa-router';

// tslint:disable-next-line:no-default-import import-spacing
import authRouter from './auth';
// tslint:disable-next-line:no-default-import import-spacing
import  userRouter from './users';

const commonRouter = new Router();

commonRouter.use('/users', userRouter);
commonRouter.use('/auth', authRouter);

// tslint:disable-next-line:no-default-export
export default commonRouter.routes();
