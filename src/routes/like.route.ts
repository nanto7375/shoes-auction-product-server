import { Router, Request, Response } from 'express';
// import { Joi, Segments, celebrate } from 'celebrate';
import ErrorException from '../exceptions/form.exception';
import { badData, badRequest } from '../exceptions/definition.exception';
import { resSuccess, responseWrapper } from '../utils/handler';
import { LikeService, ProductService } from '../services';

const router = Router();

/**
 * @api {post} / like 좋아요 등록/해재
 * @param   {string}  productUuid : 상품 uuid
 * @param   {string}  userUuid : 사용자 uuid
 * @param   {boolean} doLike : true(좋아요), false(좋아요 해재)
 * @returns {like}
*/
router.post( '/like', responseWrapper( async ( req: Request, res: Response ) => {
  const { useruuid: userUuid } = req.headers;
  const { productUuid, doLike } = req.body; // like를 받고, 여부에 따라 좋아요 등록/해재

  // 좋아요 여부확인
  const isLike = await LikeService.getLikeByUserAndProductId({ productUuid, userUuid });

  if ( doLike && isLike || !doLike && !isLike ) {
    throw new ErrorException( badData, `like doesn't exist which matches` );
  }

  const like = doLike ? await LikeService.doLike({ productUuid, userUuid }) : await LikeService.unDoLike({ productUuid, userUuid });

  resSuccess( res, { like });
}) );


/**
 * @api {get} / likes/:productUuid 유저의 상품 좋아요 유무 조회
 * @param  {string} productUuid : 상품 uuid
 * @returns {Like} 상품 좋아요
*/
router.get( '/like/:productUuid', responseWrapper( async ( req: Request, res: Response ) => {
  const { useruuid: userUuid } = req.headers;
  const { productUuid } = req.params;

  const like = await LikeService.getLikeByUserAndProductId({ productUuid, userUuid });

  resSuccess( res, { like });
}) );

export default router;
