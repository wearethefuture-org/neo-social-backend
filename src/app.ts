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

import koaCors from '@koa/cors';
import Koa from 'koa';
import koaBodyparser from 'koa-bodyparser';
import koaStatic from 'koa-static';

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

app.use(koaCors());
app.use(koaBodyparser());
app.use(koaStatic(Platform.publicDIR));

app.use(errorMiddleware);
app.use(authMiddleware);
app.use(fileMiddleware);

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = process.env.PORT;

app.listen(PORT, (): void => {
    console.info('system', `Server started! http://127.0.0.1:${PORT}`, `On ${process.env.NODE_ENV} environment`);
});
