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





