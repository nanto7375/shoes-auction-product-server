import db from "../models";

const { Auction, Op } = db;

export const create = async ({ productUuid, userUuid, bidPrice }) => {
  const result = await Auction.create({ productUuid, userUuid, bidPrice });

  return result;
};

export const findTopPriceOne = async ( productUuid ) => {
  const auction = await Auction.findOne({ where: { productUuid, result: false }, order: [ [ 'bidPrice', 'DESC' ] ] });
  
  return auction;
};
