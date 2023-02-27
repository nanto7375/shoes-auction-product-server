import { AuctionRepository } from "../repositories";

export const getTopPriceAuction = async ( productUuid ) => {
  const auction = await AuctionRepository.findTopPriceOne( productUuid );

  return auction;
};

export const doAuction = async ({ productUuid, userUuid, bidPrice }) => {
  const result = await AuctionRepository.create({ productUuid, userUuid, bidPrice });
  
  return result;
};


