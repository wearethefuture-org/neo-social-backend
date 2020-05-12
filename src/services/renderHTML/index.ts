import koaPug, { KoaPug } from 'koa-pug';
import * as path from 'path';

export class RenderHTMLService {
    private pug: KoaPug;

    constructor() {
        this.pug = new koaPug({
            viewPath: path.resolve(__dirname, '../../views')
        });
    }

    async render(name: any, params: any): Promise<any> {
        return this.pug.render(name, params);
    }
}
