import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const envConfig = {
  // env
  env: process.env.ENV,
  
  // port
  port: process.env.PRODUCT_PORT || 3002,

  // db
  database: process.env.PRODUCT_MYSQL_DB,
  username: process.env.PRODUCT_MYSQL_DB_USER,
  password: process.env.PRODUCT_MYSQL_DB_PASSWORD,
  host: process.env.PRODUCT_MYSQL_DB_HOST,
  dbPort: process.env.PRODUCT_MYSQL_DB_PORT,
  
  // another server url
  authServer: process.env.AUTH_SERVER_ADDRESS,
  userServer: process.env.USER_SERVER_ADDRESS,
  productServer: process.env.PRODCUT_SERVER_ADDRESS,
  logServer: process.env.LOG_SERVER_ADDRESS,

  // mq
  // mqServerAddress: process.env.MQ_SERVER_ADDRESS,
  // mqServerQueueName: process.env.MQ_SERVER_QUEUENAME,
};

export default envConfig;
