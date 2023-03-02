import { Router, Request, Response } from 'express';
// import { Joi, Segments, celebrate } from 'celebrate';
import ErrorException from '../exceptions/form.exception';
import { badData, badRequest } from '../exceptions/definition.exception';
import { resSuccess, responseWrapper } from '../utils/handler';
import { ProductService } from '../services';
import { productMiddleware } from '../middlewares';
const router = Router();
const { validateBrand } = productMiddleware;

/**
 * query {
 *  page?: number; 
 *  brand?: null | 'nike' | 'adidas' | 'newbalance' | 'handmade'; 
 *  active?: 'true' | 'false';
 * }
 */
router.get( '/products', validateBrand, responseWrapper( async ( req: Request, res: Response ) => {
  const { page, brand, active } = req.query;
  
  // page default: 1, brand default: null, activie default: 'false'
  const { count, products } = await ProductService.getProductsAndCount({ 
    page: ( page ? +page : 1 ) || 1,
    brand, 
    active: JSON.parse( active as string || 'false' ), 
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

  console.log( "product test", userUuid, name, brand, price, description, image, auction_end_date, info );

  const product = await ProductService.createProduct({ userUuid, name, brand, price, description, image, auction_end_date, info });

  resSuccess( res, { product });
}) );

/**
 * @api {get} / product/:productUuid 상품 조회
 * @param  {string} productUuid : 상품 uuid
 * @returns {Product} product : 상품
*/
router.get( '/product/:productUuid', responseWrapper( async ( req: Request, res: Response ) => {
  
  const { useruuid: userUuid } = req.headers;
  const { productUuid } = req.params;

  console.log( "product test", userUuid, productUuid );

  const product = await ProductService.getProductAndAutions( productUuid, userUuid );

  resSuccess( res, { product });
}) );






export default router;
