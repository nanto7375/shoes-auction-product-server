import { Router, Request, Response } from 'express';
// import { Joi, Segments, celebrate } from 'celebrate';
import ErrorException from '../exceptions/form.exception';
import { badData, badRequest } from '../exceptions/definition.exception';
import { resSuccess, responseWrapper } from '../utils/handler';
import { auctionMw } from '../middlewares';
import { AuctionService, ProductService } from '../services';

const router = Router();
const { checkReqAuctionPost } = auctionMw;

router.post( '/auction', checkReqAuctionPost, responseWrapper( async ( req: Request, res: Response ) => {
  const { useruuid: userUuid } = req.headers;
  const { productUuid, bidPrice } = req.body;

  const [ product, topPriceAuction ] = await Promise.all([
    ProductService.findByUuid( productUuid ), 
    AuctionService.getTopPriceAuction( productUuid ), 
  ]);

  if ( !product ) {
    throw new ErrorException( badData, `product doesn't exist which matches uuid` );
  }
  if ( userUuid === product.userUuid ) {
    throw new ErrorException( badRequest, `seller can't roup to his` );
  }
  if ( bidPrice <= product.price ) {
    throw new ErrorException( badRequest, `bidPrice should be larger than product price` );
  }
  if ( topPriceAuction && ( bidPrice <= topPriceAuction.bidPrice ) ) {
    throw new ErrorException( badRequest, `bidPrice should be larger than topAuctionPrice` );
  }

  const result = await AuctionService.doAuction({ productUuid, userUuid, bidPrice });

  resSuccess( res, { result });
}) );

export default router;
