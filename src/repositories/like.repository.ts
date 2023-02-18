import db from "../models";

const { Like } = db;

export const findAll = async () => {
  const likes = await Like.findAll();
  return likes;
};
