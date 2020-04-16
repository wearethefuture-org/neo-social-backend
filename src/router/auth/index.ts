import * as Router from 'koa-router';
import { confirmRegistration, login, register } from './handlers/authHandlers';

const authRouter = new Router();

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.post('/confirm', confirmRegistration);

// tslint:disable-next-line:no-default-export
export default  authRouter.routes();
