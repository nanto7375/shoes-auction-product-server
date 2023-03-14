import { Request, Response, NextFunction } from "express";
import { badData, unAuthorized } from "../exceptions/definition.exception";
import ErrorException from '../exceptions/form.exception';

const SHOES_BRAND = {
  nike: 1,
  adidas: 1,
  newbalance: 1,
  handmade: 1,
};

const isValidPage = ( page ) => !( ( page && +page <= 0 ) || Number.isNaN( +page ) );

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

export const checkGetProducts = async ( req: Request, res: Response, next: NextFunction ) => {    
  const { page, active } = req.query;

  try{
    if ( !isValidPage( page ) ) {
      throw new ErrorException( badData );
    }
    if ( !page ) {
      req.query.page = '1';
    }
    if ( !active ) {
      req.query.active = 'false';
    }

    next();
  } catch ( error ) {
    next( error );
  }};

export const checkProductPost = async ({ body, headers }: Request, res: Response, next: NextFunction ) => {
  const { useruuid: userUuid } = headers;
  const { name, brand, price, description, image, auction_end_date } = body;

  console.log( userUuid ,body );
  body.brand as 'nike' | 'adidas' | 'handmade';

  try {
    if ( !userUuid ) {
      throw new ErrorException( unAuthorized );
    }
    // ! userUuid 값 없는 경우는 unAuthorized 에러를 던지는 게 맞는 듯! (나도 뒤닂게 수정함ㅋ)
    if ( !name || !userUuid || !price || !description || !image || !auction_end_date ) {
      throw new ErrorException( badData, 'product post request body error' );
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

export const checkGetProductsBidding = async ( req: Request, res: Response, next: NextFunction ) => {
  const { page } = req.query;

  try {
    if ( !req.headers.useruuid ) {
      throw new ErrorException( unAuthorized );
    }
    if ( !isValidPage( page ) ) {
      throw new ErrorException( badData );
    }
    if ( !page ) {
      req.query.page = '1';
    }

    next();
  } catch ( error ) {
    next( error );
  }
};
