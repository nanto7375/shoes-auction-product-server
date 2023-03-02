import { Router, Request, Response } from 'express';
// import { Joi, Segments, celebrate } from 'celebrate';
import ErrorException from '../exceptions/form.exception';
import { badData, badRequest } from '../exceptions/definition.exception';
import { resSuccess, responseWrapper } from '../utils/handler';
import { AuctionMiddleware } from '../middlewares';
import { AuctionService, ProductService } from '../services';

const router = Router();
const { checkReqAuctionPost } = AuctionMiddleware;

router.post( '/auction', checkReqAuctionPost, responseWrapper( async ( req: Request, res: Response ) => {
  const { useruuid: userUuid } = req.headers;
  const { productUuid, bidPrice } = req.body;

  const [ product, topPriceAuction ] = await Promise.all([
    ProductService.findByUuid( productUuid ), 
    AuctionService.getTopPriceAuction( productUuid ), 
  ]);

  
  if ( !product ) { // uuid에 해당하는 product 있는지 체크
    throw new ErrorException( badData, `product doesn't exist which matches uuid` );
  }
  if ( userUuid === product.userUuid ) {  // 자기 등록 상품인지 체크
    throw new ErrorException( badRequest, `seller can't roup to his` );
  }
  if ( topPriceAuction && ( bidPrice <= topPriceAuction.bidPrice ) ) {  // 현재 입찰가가 최고입찰가보다 높은지 체크
    throw new ErrorException( badRequest, `bidPrice should be larger than topAuctionPrice` );
  }
  if ( !topPriceAuction && bidPrice <= product.price ) {  // 입찰가가 상품 등록가보다 높은지 체크(최초 입찰 시 필요)
    throw new ErrorException( badRequest, `bidPrice should be larger than product price` );
  }

  const result = await AuctionService.doAuction({ productUuid, userUuid, bidPrice });

  resSuccess( res, { result });
}) );

export default router;
