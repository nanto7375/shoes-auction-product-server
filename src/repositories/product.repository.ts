import db from "../models";

const { Product, Auction, Like ,Op } = db;

export const findByUuid = async ( uuid ) => {
  const product = await Product.findOne({ where: { uuid } });

  return product;
};

export const getProductsAndCount = async ({ page, brand, active }) => {
  const where = { ...( brand && { brand }), status: active ?  'SELLING' : { [Op.in]: [ 'SELLING', 'WAITING' ] } };
  const limit = 20;
  const offset = ( page - 1 ) * limit;
  const { count, rows: products } = await Product.findAndCountAll({ where, offset, limit });

  return { count, products };
};

export const createProduct = async ({ userUuid, name, brand, price, description, image, auction_end_date, info }) => {
  const product = await Product.create({ userUuid, name, brand, price, description, image, auction_end_date, info });
  
  return product;
};

export const getProductAndAutions = async ( productUuid, userUuid ) => {
  const where = { uuid: productUuid };
  const joinWhere = userUuid ? { userUuid, productUuid } :  { createdAt: null };

  // 상품 조회 시, 해당 상품의 경매 정보를 조회
  // userUuid가 있을 경우, 해당 유저가 해당 상품에 좋아요를 눌렀는지 조회
  const product = await Product.findOne({
    where,
    include: [
      { model: Auction, as: 'auctions', attributes: [ 'bidPrice', 'result', 'createdAt' ], order: [ [ 'bidPrice', 'ASC' ] ], required: false },
      { model: Like, as: 'likes', attributes: [ 'createdAt' ], where: joinWhere , required: false },
    ],
  });

  return product;
};





