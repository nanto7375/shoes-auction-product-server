import { Router, Request, Response } from 'express';
// import { Joi, Segments, celebrate } from 'celebrate';
import ErrorException from '../exceptions/form.exception';
import { badData, badRequest } from '../exceptions/definition.exception';
import { resSuccess, responseWrapper } from '../utils/handler';


const router = Router();

router.get( '/auctions', responseWrapper( async ( req: Request, res: Response ) => {

  console.log( "auctions test" );
  
  resSuccess( res, {});
}) );

export default router;
