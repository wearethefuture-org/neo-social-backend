import * as path from 'path';

// tslint:disable-next-line:no-require-imports
const multer = require('@koa/multer');

import { match } from 'path-to-regexp';
import { singleFilesUrls } from '../enums/Urls/index';

const storage = multer.diskStorage({
    destination: (req: any , file: any, cb: any) => {
        cb(undefined, path.join(__dirname, '../public'));
    },
    filename: (req: any , file: any, cb: any) => {
        const type = file.originalname.split('.')[1];
        cb(undefined, `${Date.now()}.${type}`);
    }
});

const upload = multer({storage});

export const fileMiddleware = async (ctx: any, next: any) => {
    const { url, method } = ctx.request;

    for (const route of singleFilesUrls) {
        if (method !== route.method) {
            continue;
        }

        const regexp = match(route.url, {decode: decodeURIComponent});

        if (!regexp(url)) {
            continue;
        }

        return upload.single(route.field)(ctx, next);
    }

    return next();
};
