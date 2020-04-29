const swagger = require('koa-swagger-decorator');

import commonChatsRouter from './chats';
import userRouter from './users';

import { AuthRouter } from './authRouter';
import { ProfileRouter } from './profileRouter';

export const apiRouterV1 = new swagger.SwaggerRouter();

apiRouterV1.map(AuthRouter, {});
apiRouterV1.map(ProfileRouter, {});

apiRouterV1.use('/users', userRouter);
apiRouterV1.use('/chats', commonChatsRouter);

apiRouterV1.swagger({
    title: 'API V1',
    description: 'API V1 DOC',
    version: '1.0.0',
    prefix: '/api/v1',
    swaggerHtmlEndpoint: '/swagger-html',
    swaggerJsonEndpoint: '/swagger-json',
    swaggerOptions: {
        securityDefinitions: {
            ApiKeyAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization'
            }
        }
    },
    swaggerConfiguration: {
        display: {
            defaultModelsExpandDepth: 4,
            defaultModelExpandDepth: 3,
            docExpansion: 'list',
            defaultModelRendering: 'model'
        }
    }
});
