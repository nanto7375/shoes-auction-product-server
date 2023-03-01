import { Request, Response, NextFunction } from "express";
import { badData } from "../exceptions/definition.exception";
import ErrorException from '../exceptions/form.exception';

const SHOES_BRAND = {
  nike: 1,
  adidas: 1,
  newbalance: 1,
  handmade: 1,
};

export const checkBrand = ( req: Request, res: Response, next: NextFunction ) => {
  const brand = req.query?.brand;

  try {
    if ( brand && !SHOES_BRAND[brand as string]) {
      throw new ErrorException( badData, 'wrong brand' );
    }

    next();
  } catch ( error ) {
    next( error );
  }
};
