/**
 * Loading env variables
 */
import { envIndex } from './services/env';
envIndex(`${__dirname}/../`);

import * as Koa from 'koa';
import * as koaBody from 'koa-body';

// tslint:disable-next-line:no-require-imports
const cors = require('@koa/cors');
// tslint:disable-next-line:no-require-imports
const swagger = require('koa-swagger-decorator');

import { authMiddleware } from './middleware/authMiddleware';
import { errorMiddleware } from './middleware/errorMiddleware';

import { apiRouterV1 } from './router';

const app = new Koa();
app.use(cors());

const router = new swagger.SwaggerRouter();
router.use('/api/v1', apiRouterV1.routes());

router.swagger({
    title: 'API',
    description: 'API DOC',
    version: '1.0.0'
});

app.use(errorMiddleware);
app.use(authMiddleware);
app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = process.env.PORT;

app.listen(PORT, (): void => {
    // tslint:disable-next-line:no-console
    console.log('system', `Server started! http://127.0.0.1:${PORT}`, `On ${process.env.NODE_ENV} environment`);
});
