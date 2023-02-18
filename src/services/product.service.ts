import { ProductRepository } from "../repositories";

export const getProducts = async () => {
  const products = await ProductRepository.findAll();

  return products;
};


