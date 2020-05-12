import { IFile } from '../../interfaces';
import { BaseModelService } from '../baseModel';

export class FilesService extends BaseModelService {
    public async create(file: object): Promise<{ dataValues: IFile }> {
        return this.model.files.create(file);
    }
}
