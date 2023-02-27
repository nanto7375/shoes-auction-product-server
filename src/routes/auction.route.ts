import { Router, Request, Response } from 'express';
// import { Joi, Segments, celebrate } from 'celebrate';
import ErrorException from '../exceptions/form.exception';
import { badData, badRequest } from '../exceptions/definition.exception';
import { resSuccess, responseWrapper } from '../utils/handler';
import { auctionMw } from '../middlewares';
import { AuctionService } from '../services';

const router = Router();
const { checkAuctionPost } = auctionMw;

router.post( '/auction', checkAuctionPost, responseWrapper( async ( req: Request, res: Response ) => {
  const { useruuid: userUuid } = req.headers;
  const { productUuid, bidPrice } = req.body;
  const result = await AuctionService.doAuction({ productUuid, userUuid, bidPrice });

  resSuccess( res, { result });
}) );

router.get( '/auctions', responseWrapper( async ( req: Request, res: Response ) => {

  console.log( "auctions test" );
  
  resSuccess( res, {});
}) );

export default router;
