// tslint:disable-next-line:no-require-imports
const multer = require('@koa/multer');

import * as path from 'path';
import { match } from 'path-to-regexp';

import { singleFilesUrls } from '../enums/Urls';
import { Platform } from '../platform';

const storage = multer.diskStorage({
    destination: (req: any , file: any, cb: any) => {
        cb(undefined, Platform.publicDIR);
    },
    filename: (req: any , file: any, cb: any) => {
        const ext = path.extname(file.originalname);
        cb(undefined, `${Date.now()}${ext}`);
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
