import passport from 'koa-passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { UserService } from '../user';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
};

passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
        const userService = new UserService();

        const user = await userService.getUserByEmail(jwtPayload.user.email);

        if (user) {
            // changes null to undefined
            done(undefined, user);
        } else {
            // changes null to undefined
            done(undefined, false);
        }
    })
);
export {
    passport
};
