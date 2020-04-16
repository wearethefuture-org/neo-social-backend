import * as fs from 'fs';
import * as path from 'path';
import { Sequelize } from 'sequelize-typescript';

import { aliases } from './aliases';
import { relations } from './relations';

const basename = path.basename(__filename);
const db: any = {
  aliases
};

const sequelize: any = new Sequelize(process.env.DATABASE_NAME, process.env.POSTGRES_USERNAME, process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

fs.readdirSync(`${__dirname}/sources`)
    .filter(file =>
        (
            file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts'
        ))
    .forEach(file => {
      const model: any = sequelize.import(path.join(__dirname, 'sources', file));
      db[model.name] = model;
    });

Object.keys(db)
    .forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

relations(db);

export {
  db as Model
};
