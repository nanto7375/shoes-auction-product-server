import { Request, Response, NextFunction } from "express";
import { badData, unAuthorized } from "../exceptions/definition.exception";
import ErrorException from "../exceptions/form.exception";

export const checkReqAuctionPost = async ({ body, headers }: Request, res: Response, next: NextFunction ) => {
  const { useruuid: userUuid } = headers;
  const { productUuid, bidPrice } = body;

  try {
    if ( !userUuid ) {
      throw new ErrorException( unAuthorized );
    }
    if ( !productUuid || !userUuid || !bidPrice ) {
      throw new ErrorException( badData, `auction post request body error` );
    }
    
    next();
  } catch ( error ) {
    next( error );
  }
};
