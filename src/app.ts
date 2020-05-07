/**
 * Loading env variables
 */
import { envIndex } from './services/env';
envIndex(`${__dirname}/../`);

import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as serve from 'koa-static';
import * as path from 'path';

// tslint:disable-next-line:no-require-imports
const cors = require('@koa/cors');

// tslint:disable-next-line:no-require-imports
const swagger = require('koa-swagger-decorator');
import { authMiddleware } from './middleware/authMiddleware';
import { errorMiddleware } from './middleware/errorMiddleware';

import { fileMiddleware } from './middleware/fileMiddleware';
import { apiRouterV1 } from './router';

const app = new Koa();
app.use(cors());

const router = new swagger.SwaggerRouter();
router.use('/api/v1', apiRouterV1.routes());
app.use(serve(path.join(__dirname, './public')));

router.swagger({
    title: 'API',
    description: 'API DOC',
    version: '1.0.0'
});

app.use(koaBody());

app.use(errorMiddleware);
app.use(authMiddleware);
app.use(fileMiddleware);

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = process.env.PORT;

app.listen(PORT, (): void => {
    // tslint:disable-next-line:no-console
    console.log('system', `Server started! http://127.0.0.1:${PORT}`, `On ${process.env.NODE_ENV} environment`);
});
