import { AuctionRepository } from "../repositories";

export const getAuctions = async () => {
  const auctions = await AuctionRepository.findAll();

  return auctions;
};


