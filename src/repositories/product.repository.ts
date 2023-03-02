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
  // ! joinWhere userUuid가 없을 때 저렇게 되면 created null인 값들이 전부 포함될 텐데, 정확한 의도를 모르겠음!
  // ! 그리고 like를 품고 있으면 함수명도 그것을 표현해주고 있어야 하지 않을까 생각됨!

  // ! 좋아요를 product에 포함시키는 게 아니라, api가 조금 느려지더라도 좋아요 유무는 따로 디비를 조회해도 나쁘지 않을 듯
  // ! auction은 product에 종속되지만, 좋아요는 user 쪽에 종속된다고 봐야 하니까
  // ! 이거는 너도 한 번 더 생각해 보고 좋아 보이는 방식으로 수정하길! (수정 안 하려면 그래도 됨ㅎㅎ)
  // ! 앞서 말한 의미에서, 좋아요 유무는 아얘 새로운 api로 만드는 것도 나빠 보이지 않음!

  // 상품 조회 시, 해당 상품의 경매 정보를 조회
  // userUuid가 있을 경우, 해당 유저가 해당 상품에 좋아요를 눌렀는지 조회
  const product = await Product.findOne({
    where,
    include: [
      // ! 내가 알기로 order를 model 안에 넣으면 제대로 적용 안 되는 걸로 알고 있음!
      // ! order를 include 밖으로 빼고, [[Auction, 'bidPrice', 'ASC']] 이렇게 넣어야, 우리가 바라는 대로 나올 걸?!
      { model: Auction, as: 'auctions', attributes: [ 'bidPrice', 'result', 'createdAt' ], order: [ [ 'bidPrice', 'ASC' ] ], required: false },
      { model: Like, as: 'likes', attributes: [ 'createdAt' ], where: joinWhere , required: false },
    ],
  });

  return product;
};





