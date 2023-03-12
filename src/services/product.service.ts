import { ProductRepository } from "../repositories";

export const findByUuid = async( uuid ) => {
  const product = await ProductRepository.findByUuid( uuid );
  
  return product;
};

export const getProductsAndCount = async ({ page, brand, active }) => {
  const { count, products } = await ProductRepository.getProductsAndCount({ page, brand, active });

  return { count, products };
};

export const createProduct = async ({ userUuid, name, brand, price, description, image, auction_end_date, info }) => {
  const product = await ProductRepository.createProduct({ userUuid, name, brand, price, description, image, auction_end_date, info });

  return product;
};

export const getProductIncludingAuctions = async( productUuid ) => {
  const product = await ProductRepository.getProductIncludingAuctions( productUuid );
  
  return product;
};

