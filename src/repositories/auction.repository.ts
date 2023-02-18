import db from "../models";

const { Auction } = db;

export const findAll = async () => {
  const auctions = await Auction.findAll();
  return auctions;
};
