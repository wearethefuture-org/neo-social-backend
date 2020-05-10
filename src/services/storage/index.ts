import { IFile } from '../../interfaces';
import { BaseModelService } from '../baseModel';

export class StorageService extends BaseModelService {
    public url = `${process.env.URL}:${process.env.PORT}`;

    public async uploadFile(file: any): Promise<IFile> {
        const url = `${this.url}/${file.filename}`;

        return this.model.files.create({name: file.filename, url});
    }

    // public async deleteFile(path: string): Promise<void> {
    //     // delete file
    // }
}
