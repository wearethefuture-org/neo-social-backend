/**
 * Loading env variables
 */
import { envIndex } from './services/env';
envIndex(`${__dirname}/../`);

import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as Router from 'koa-router';
const cors = require('@koa/cors');
import { authMiddleware } from './middleware/authMiddleware';
// tslint:disable-next-line:no-default-import
import router from './router';

const app = new Koa();
app.use(cors());

const apiRouter = new Router({ prefix: '/api/v1'});
apiRouter.use(router);

app.use(authMiddleware);
app.use(koaBody());
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());

const PORT = process.env.PORT;

app.listen(PORT, (): void => {
    // tslint:disable-next-line:no-console
    console.log('system', `Server started! http://127.0.0.1:${PORT}`, `On ${process.env.NODE_ENV} environment`);
});
