import envConfig from './env.config';
import logger from './log.config';

const { env, database, username, password, host, dbPort } = envConfig;

const myLog = ( msg:string ) => {
  logger.info({ dbMsg: msg });
};

const sequelizeConfig = {
  type: 'mysql',
  database: database,
  username: username,
  password: password,
  options: {
    host: host,
    port: dbPort,
    dialect: 'mysql',
    timezone: '+09:00',
    pool: {
      max: 5,
      min: 1,
      idle: 10000,
    },
    logging: env !== 'PROD' ? myLog : false,
    logQueryParameters: true,
  },
};

export default sequelizeConfig;
