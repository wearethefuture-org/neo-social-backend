import { formData, request, summary, tags } from 'koa-swagger-decorator';
// import { FilesService } from '../services/files';
// import { UserService } from '../services/user';
import { HttpServerError } from '../utils/httpError';

export class ProfileRouter {
    @request('post', '/profile/avatar')
    @summary('Add avatar')
    @tags(['Profile'])
    @formData({
        file: {
            type: 'file',
            required: true,
            description: 'avatar'
        }
    })
    static async avatar(ctx: any): Promise<void> {
        try {
            // const {request, user} = ctx;
            //
            // const value = await new FilesService().create({name: 'test', url: 'localhost:3002'});
            // const test = await new UserService().updateUser(user.id, {avatarId: 1});
            //
            // console.log(value, test);

            // try {
            //     if (picture && picture.includes('{{url}}')) {
            //         fs.unlinkSync(path.join(dir, 'img', picture.replace('{{url}}', '')));
            //     }
            // } catch (e) {
            //     console.error(e);
            // }
            //
            // const ext = path.extname(file.name);
            // const name = `${userID}_${+new Date()}${ext}`;
            //
            // const reader = fs.createReadStream(file.path);
            // const stream = fs.createWriteStream(path.join(dir, 'img', name));
            //
            // reader.pipe(stream);
        } catch (e) {
            throw new HttpServerError(e);
        }
    }
}
