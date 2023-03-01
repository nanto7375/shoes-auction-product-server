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
  
  const { count, products } = await ProductService.getProductsAndCount({ 
    page: ( page ? +page : 1 ) || 1,
    brand, 
    active: JSON.parse( active as string || 'false' ), 
  });
  
  resSuccess( res, { count, products });
}) );


export default router;
