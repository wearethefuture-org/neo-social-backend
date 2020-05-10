/**
 * Loading env variables
 */
import { envIndex } from './services/env';
envIndex(`${__dirname}/../`);

/**
 * Init platform
 */
import { Platform } from './platform';
Platform.init();

import Koa from 'koa';
import koaBody from 'koa-body';
import serve from 'koa-static';

// tslint:disable-next-line:no-require-imports
const cors = require('@koa/cors');

import { SwaggerRouter } from 'koa-swagger-decorator';

import { authMiddleware } from './middleware/authMiddleware';
import { errorMiddleware } from './middleware/errorMiddleware';
import { fileMiddleware } from './middleware/fileMiddleware';

import { apiRouterV1 } from './router';

const app = new Koa();
const router = new SwaggerRouter();

router.swagger({
    title: 'API',
    description: 'API DOC',
    version: '1.0.0'
});

router.use('/api/v1', apiRouterV1.routes());

app.use(cors());
app.use(koaBody());

app.use(serve(Platform.publicDIR));

app.use(errorMiddleware);
app.use(authMiddleware);
app.use(fileMiddleware);

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = process.env.PORT;

app.listen(PORT, (): void => {
    console.info('system', `Server started! http://127.0.0.1:${PORT}`, `On ${process.env.NODE_ENV} environment`);
});
