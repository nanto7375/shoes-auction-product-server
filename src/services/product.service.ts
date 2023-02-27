import { ProductRepository } from "../repositories";

export const findOneByUuid = async( uuid ) => {
  const product = await ProductRepository.findOneByUuid( uuid );
  
  return product;
};

export const getProductsAndCount = async ({ page, brand, active }) => {
  const { count, products } = await ProductRepository.getProductsAndCount({ page, brand, active });

  return { count, products };
};


