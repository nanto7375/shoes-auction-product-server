import { Router, Request, Response } from 'express';
// import { Joi, Segments, celebrate } from 'celebrate';
import ErrorException from '../exceptions/form.exception';
import { badData, badRequest, unAuthorized } from '../exceptions/definition.exception';
import { resSuccess, responseWrapper } from '../utils/handler';
import { ProductService } from '../services';
import { productMiddleware } from '../middlewares';
const router = Router();
const { validateBrand, checkGetProducts, checkGetProductsBidding } = productMiddleware;

/**
 * @api 상품 목록 조회
 * @query page: number
 * @query brand?: 'nike' | 'adidas' | 'newbalance' | 'handmade'
 * @query active: 'true' | 'false'
 */
router.get( '/products', [ validateBrand, checkGetProducts ], responseWrapper( async ( req: Request, res: Response ) => {
  const { page, brand, active } = req.query;
  
  const { count, products } = await ProductService.getProductsAndCount({ 
    page: +page,
    brand, 
    active: JSON.parse( active as string ), 
  });
  
  resSuccess( res, { count, products });
}) );

/**
 * @api {post} / product 상품 등록
 * @param   {string} name : 상품명
 * @param   {string} brand : 브랜드명
 * @param   {number} price : 가격
 * @param   {string} description : 상품 설명
 * @param   {string} images : 이미지 url
 * @param   {string} auction_end_date : 경매 종료일 (YYYY-MM-DD HH24:mm:ss)
 * @returns {Product} product : 상품
*/
router.post( '/product', productMiddleware.checkProductPost, responseWrapper( async ( req: Request, res: Response ) => {
  const { useruuid: userUuid } = req.headers;
  const { name, brand, price, description, image, auction_end_date, info } = req.body;

  const product = await ProductService.createProduct({ userUuid, name, brand, price, description, image, auction_end_date, info });

  resSuccess( res, { product });
}) );

/**
 * @api {get} / product/:productUuid 상품 조회
 * @param  {string} productUuid : 상품 uuid
 * @returns {Product} product : 상품
*/
router.get( '/product/:productUuid', responseWrapper( async ( req: Request, res: Response ) => {
  const { productUuid } = req.params;

  const product = await ProductService.getProductIncludingAuctions( productUuid );

  resSuccess( res, { product });
}) );

/**
 * @api 구매입찰현황
 * @query page: number 
 * @query status?: 'SELLING'|'WAITING'|'SOLD'|'FAILED'
 * @query brand?: 'nike' | 'adidas' | 'newbalance' | 'handmade'
 */
router.get( '/products/bidding', checkGetProductsBidding, responseWrapper( async( req: Request, res: Response ) => {
  const { useruuid: userUuid } = req.headers;
  const { page, status, brand } = req.query;

  const where = { ...( brand && { brand }), ...( status && { status }) };
  const { count, products } = await ProductService.getProductsBidding({ userUuid, page: +page , where });

  resSuccess( res, { count, products });
}) );


export default router;
