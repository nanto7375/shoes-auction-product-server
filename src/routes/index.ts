import { Router } from 'express';
import ProductRouter from './product.route';
import AuctionRouter from './auction.route';
import LikeRouter from './like.route';

const router = Router();

router.use( ProductRouter );
router.use( AuctionRouter );
router.use( LikeRouter );

export default router;
