import { HttpError } from '../utils/httpError';

export const errorMiddleware = async (ctx: any, next: any) => {
    try {
        await next();
    } catch (error) {
        throw new HttpError(400, error, 'Bad Request');
    }
};
