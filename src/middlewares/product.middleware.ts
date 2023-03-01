import { Request, Response, NextFunction } from "express";
import { badData } from "../exceptions/definition.exception";
import ErrorException from '../exceptions/form.exception';

export const checkBrand = ({ query }: Request, res: Response, next: NextFunction ) => {
  const { brand } = query;
  try {
    if ( brand && ( brand !== 'nike' && brand !== 'adidas' && brand !== 'handmade' && brand !== 'newbalance' ) ) {
      throw new ErrorException( badData, 'wrong brand' );
    }

    next();
  } catch ( error ) {
    next( error );
  }
};
