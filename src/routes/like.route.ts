import { Router, Request, Response } from 'express';
// import { Joi, Segments, celebrate } from 'celebrate';
import ErrorException from '../exceptions/form.exception';
import { badData, badRequest } from '../exceptions/definition.exception';
import { resSuccess, responseWrapper } from '../utils/handler';
import { LikeService } from '../services';


const router = Router();

/**
 * @api {post} / like 좋아요 등록/해재
 * @param  {string} productUuid : 상품 uuid
 * @param  {string} userUuid : 사용자 uuid
 * @returns {boolean} doLike : true(좋아요), false(좋아요 해재)
*/
router.post( '/like', responseWrapper( async ( req: Request, res: Response ) => {
  const { useruuid: userUuid } = req.headers;
  const { productUuid } = req.body;
    
  // ! 좋아요를 할지, 좋아요 제거를 할지의 명확한 값을 프론트에서 받는 게 나는 맞아 보임!

  // 좋아요 여부확인
  const isLike = await LikeService.isLike({ productUuid, userUuid });
  
  // 좋아요 여부에 따른 좋아요 등록/해재
  const dolike = await LikeService.doLike({ productUuid, userUuid, isLike });

  resSuccess( res, { dolike });
}) );


export default router;
