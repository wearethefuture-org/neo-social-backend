import { unauthorizedUrls } from '../enums/Urls';
import { USER_STATUS } from '../enums/users/constants';
import { passport } from '../services/passport';
import { HttpError } from '../utils/httpError';

import { match } from 'path-to-regexp';


export const authMiddleware = async (ctx: any, next: any) => {
       await passport.authenticate('jwt', { session: false }, async (err: Error, user: any) => {
              if (err) {
                     throw err;
              }

              const { url, method } = ctx.request;
              let routeGuared = true;

              for (let i = 0; i < unauthorizedUrls.length; i++) {
                     const regexp = match(unauthorizedUrls[i].url, {decode: decodeURIComponent});
                     if (method === unauthorizedUrls[i].method && regexp(url)) {
                            routeGuared = false;
                            break;
                     }
              }

              if (!routeGuared) {
                     await next();

                     return;
              }

              if (!user) {
                     throw new HttpError(401, 'Unauthorized!' , 'Access denied');
              }

              if (user.status !== USER_STATUS.confirmed) {
                     throw new HttpError(401, 'Unconfirmed email!' , 'Access denied');
              }

              ctx.user = user;
              await next();
       })(ctx, next);
};
