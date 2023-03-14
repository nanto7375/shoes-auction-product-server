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

export const getProductIncludingAuctions = async ( productUuid ) => {
  const where = { uuid: productUuid };

  const product = await Product.findOne({
    where,
    include: [
      { model: Auction, as: 'auctions', attributes: [ 'bidPrice', 'result', 'createdAt' ], required: false, order: [ [ 'bidPrice', 'DESC' ] ]  },
    ],
    
  });

  return product;
};

export const getProductsBiddingAndCount = async ({ userUuid, page, where }) => {
  const limit = 5;
  const offset = ( page - 1 ) * limit;
  const include = [
    { model: Auction, as: 'auctions', where: { userUuid: [ userUuid ] }, required: true, group: 'auctions.productUuid' },
  ];

  const { count: counts, rows: products_which_i_bade_for  } = await Product.findAndCountAll({ where, offset, limit, include, group: 'products.uuid', order: [ [ Auction, 'createdAt', 'DESC' ] ] });

  const products = await Promise.all( products_which_i_bade_for.map( product => 
    Product.findOne({ where: { uuid: product.uuid }, include: [ { model: Auction, as: 'auctions' } ] }) 
  ) );

  return { count: counts.length, products };
};





