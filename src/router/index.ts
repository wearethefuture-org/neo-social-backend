// tslint:disable-next-line:no-require-imports
const swagger = require('koa-swagger-decorator');
import { AuthRouter } from './auth';
import { ChatRouter } from './chats';
import { UserRouter } from './users';

export const apiRouterV1 = new swagger.SwaggerRouter();

apiRouterV1.map(AuthRouter, {});
apiRouterV1.map(ChatRouter, {});
apiRouterV1.map(UserRouter, {});

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
