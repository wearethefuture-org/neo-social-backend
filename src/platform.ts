import * as fs from 'fs';
import * as path from 'path';

export class Platform {
    static publicDIR: string = process.env.PUBLIC_DIR || path.join(__dirname, '../public');

    static init(): void {
        if (!fs.existsSync(Platform.publicDIR)) {
            fs.mkdirSync(Platform.publicDIR, {recursive: true});
        }
    }
}
