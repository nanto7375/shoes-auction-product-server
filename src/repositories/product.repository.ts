import db from "../models";

const { Product } = db;

export const findAll = async () => {
  const products = await Product.findAll();
  return products;
};
