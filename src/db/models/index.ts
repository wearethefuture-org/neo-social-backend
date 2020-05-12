import { Sequelize } from 'sequelize-typescript';

import { aliases } from './aliases';
import { relations } from './relations';
import * as sources from './sources';

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

[...Object.keys(sources)].forEach(modelName => {
    db[modelName] = sequelize.import(modelName, Object(sources)[modelName]);
});

[...Object.keys(db)].forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = sequelize.Op;

relations(db);

export {
    db as Model
};
