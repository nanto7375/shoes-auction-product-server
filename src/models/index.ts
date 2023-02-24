import { Sequelize, Op } from 'sequelize';

import logger from '../config/log.config';
import sequelizeConfig from '../config/sequelize.config';
import envConfig from '../config/env.config';

import ProductFactory from './product.model';
import AuctionFactory from './auction.model';
import LikeFactory from './like.model';

const { env } = envConfig;

interface SequelizeConfig {
    database: string;
    username: string;
    password: string;
    options: Record<string, unknown>;
}

const { database, username, password, options }: SequelizeConfig = sequelizeConfig;

export const sequelize = new Sequelize( database, username, password, options );

const db = {
  sequelize,
  Sequelize,
  Product: ProductFactory( sequelize ),
  Auction: AuctionFactory( sequelize ),
  Like: LikeFactory( sequelize ),
  Op,
};

// product <-> auction
db.Product.hasMany( db.Auction, { sourceKey: 'uuid', foreignKey: 'product_uuid',  onDelete: 'CASCADE', onUpdate: 'CASCADE' });
db.Auction.belongsTo( db.Product, { targetKey: 'uuid', foreignKey: 'prodcut_uuid' });

// product <-> like
db.Product.hasMany( db.Like, { sourceKey: 'uuid', foreignKey: 'product_uuid',  onDelete: 'CASCADE', onUpdate: 'CASCADE' });
db.Like.belongsTo( db.Product, { targetKey: 'uuid', foreignKey: 'prodcut_uuid' });

// sequelize
export const checkDbConnection = async () => {
  try {
    logger.info({ env : `[ENV] ${env}` });
    
    await db.sequelize.authenticate();
    if ( env === 'DEV' ) {
      await db.sequelize.sync({ force: true, alter: true });
    }

    logger.info({ dbMsg: '[DB]Connection has been established successfully.' });
  } catch ( error ) {
    console.log( error );
    logger.error({ dbMsg: `[DB]Unable to connect to the database error=${error}` });
  }
};

export default db;
