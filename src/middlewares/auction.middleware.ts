import { Request, Response, NextFunction } from "express";
import { badData } from "../exceptions/definition.exception";
import ErrorException from "../exceptions/form.exception";

export const checkReqAuctionPost = async ({ body, headers }: Request, res: Response, next: NextFunction ) => {
  const { useruuid: userUuid } = headers;
  const { productUuid, bidPrice } = body;

  try {
    if ( !productUuid || !userUuid || !bidPrice ) {
      throw new ErrorException( badData, `auction post request body error` );
    }
    
    next();
  } catch ( error ) {
    next( error );
  }
};
