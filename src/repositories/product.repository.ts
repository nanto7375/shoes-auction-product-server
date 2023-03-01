import db from "../models";

const { Product, Op } = db;

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
