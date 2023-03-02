import { Request, Response, NextFunction } from "express";
import { badData } from "../exceptions/definition.exception";
import ErrorException from '../exceptions/form.exception';

const SHOES_BRAND = {
  nike: 1,
  adidas: 1,
  newbalance: 1,
  handmade: 1,
};

export const validateBrand = ( req: Request, res: Response, next: NextFunction ) => {
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


export const checkProductPost = async ({ body, headers }: Request, res: Response, next: NextFunction ) => {
  const { useruuid: userUuid } = headers;
  const { name, brand, price, description, image, auction_end_date } = body;

  console.log( userUuid ,body );
  body.brand as 'nike' | 'adidas' | 'handmade';

  try {
    if ( !name || !userUuid || !price || !description || !image || !auction_end_date ) {
      throw new ErrorException( badData );
    }
  
    if ( price <= 0 ) {
      throw new ErrorException( badData, 'price must be greater than 0' );
    }
    
    if ( brand === '' ) {
      body.brand = 'handmade';
    }
    
    next();
  } catch ( error ) {
    next( error );
  }
};

