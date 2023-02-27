import { Request, Response, NextFunction } from "express";
import { badData, badRequest } from "../exceptions/definition.exception";
import ErrorException from "../exceptions/form.exception";
import { AuctionService } from "../services";

export const checkAuctionPost = async ({ body }: Request, res: Response, next: NextFunction ) => {
  const { productUuid, userUuid, bidPrice } = body;
  try {
    if ( !productUuid || !userUuid || !bidPrice ) {
      throw new ErrorException( badData );
    }

    const topPriceAuction = await AuctionService.getTopPriceAuction( productUuid );
  
    if ( topPriceAuction && ( bidPrice <= topPriceAuction.bidPrice ) ) {
      throw new ErrorException( badRequest );
    }
    
    next();
  } catch ( error ) {
    next( error );
  }
};
