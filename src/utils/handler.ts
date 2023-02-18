import { Request, Response, NextFunction } from 'express';
import logger from '../config/log.config';

export const resSuccess = ( res: Response, resultMessage: any ) => {
  logger.info({ status: 200, resultCode: 0, resultMessage });
  res.status( 200 ).json({ resultCode: 0, resultMessage });
};

export const resError = ( res: Response, error: any ) => {
  const status = error?.status ||  500;
  const resultCode = error?.resultCode || 19999;
  const resultMessage = error?.resultMessage || "undefined error";
  logger.error({ stack: error.stack });
  logger.error({ status, resultCode, resultMessage });
  res.status( status ).json({ resultCode, resultMessage });
};

export const responseWrapper = ( func ) => async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    await func( req, res );
  } catch ( error ) {
    next( error );
  }
};
