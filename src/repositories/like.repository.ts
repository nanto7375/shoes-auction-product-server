import db from "../models";

const { Like } = db;

export const findAll = async () => {
  const likes = await Like.findAll();
  return likes;
};

export const isLike = async ({ productUuid, userUuid }) => {
  const isLike = await Like.findOne({ where: { productUuid, userUuid } });
  return !!isLike;  
};

export const doLike = async ({ productUuid, userUuid, isLike }) => {
  const options =  { productUuid, userUuid };
  const dolike = isLike ? await Like.destroy({ where : options }) : await Like.create( options );
  return dolike === 1 ? false : true;
};
