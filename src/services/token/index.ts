import * as jwt from 'jsonwebtoken';

export class TokenService {
    async generateToken(payload: any, expiresIn: any): Promise<string> {
        const secretKey = process.env.SECRET_KEY;

        return jwt.sign(payload, secretKey, {expiresIn});
    }
}
