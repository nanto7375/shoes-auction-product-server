import { ProductRepository } from "../repositories";

export const findByUuid = async( uuid ) => {
  const product = await ProductRepository.findByUuid( uuid );
  
  return product;
};

export const getProductsAndCount = async ({ page, brand, active }) => {
  const { count, products } = await ProductRepository.getProductsAndCount({ page, brand, active });

  return { count, products };
};
