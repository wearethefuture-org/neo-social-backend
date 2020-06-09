import { aliases } from '../db/models/aliases';
import { Model } from '../db/models/index';

export class BaseModelService {
  model: any;
  aliases: any;

  constructor() {
    this.model = Model;
    this.aliases = aliases;
  }
}
