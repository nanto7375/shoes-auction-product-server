import { Request, Response, NextFunction } from "express";
import { badData, badRequest } from "../exceptions/definition.exception";
import ErrorException from "../exceptions/form.exception";
import { AuctionService, ProductService } from "../services";

export const checkAuctionPost = async ({ body, headers }: Request, res: Response, next: NextFunction ) => {
  const { useruuid: userUuid } = headers;
  const { productUuid, bidPrice } = body;

  try {
    if ( !productUuid || !userUuid || !bidPrice ) {
      throw new ErrorException( badData );
    }

    const [ product, topPriceAuction ] = await Promise.all([ 
      ProductService.findOneByUuid( productUuid ), 
      AuctionService.getTopPriceAuction( productUuid ), 
    ]);
  
    if ( !product ) {
      throw new ErrorException( badData );
    }
    if ( bidPrice <= product.price ) {
      throw new ErrorException( badRequest );
    }
    if ( topPriceAuction && ( bidPrice <= topPriceAuction.bidPrice ) ) {
      throw new ErrorException( badRequest );
    }
    
    next();
  } catch ( error ) {
    next( error );
  }
};
