import db from "../models";

const { Like } = db;

export const findAll = async () => {
  const likes = await Like.findAll();
  return likes;
};

export const doLike = async ({ productUuid, userUuid }) => {
  
  const options =  { productUuid, userUuid };
  const like = await Like.create( options );

  return like;
};

export const unDoLike = async ({ productUuid, userUuid }) => {
  const options =  { productUuid, userUuid };
  const like =  await Like.destroy({ where: options });
  return like;
};

export const getLikeByUserAndProductId = async ({ productUuid, userUuid }) => {
  const like = await Like.findOne({ where: { productUuid, userUuid } });
  return like;
};


