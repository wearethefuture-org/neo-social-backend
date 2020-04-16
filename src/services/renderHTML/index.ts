// tslint:disable-next-line:no-require-imports
const Pug = require('koa-pug');
import * as path from 'path';

export class RenderHTMLService {
    pug: any;
    constructor() {
        this.pug = new Pug ({
            viewPath: path.resolve(__dirname, '../../views')
        });
    }

    async render(name: any, params: any): Promise<any> {
        return this.pug.render(name, params);
    }
}
