import { LikeRepository } from "../repositories";

export const getLikes = async () => {
  const likes = await LikeRepository.findAll();

  return likes;
};

export const isLike = async ({ productUuid, userUuid }) => {
  const isLike = await LikeRepository.isLike({ productUuid, userUuid });

  return isLike;
};

export const doLike = async ({ productUuid, userUuid }) => {
  const like = await LikeRepository.doLike({ productUuid, userUuid });
  return like;
};

export const unDoLike = async ({ productUuid, userUuid }) => {
  const like = await LikeRepository.unDoLike({ productUuid, userUuid });
  return like;
};

export const getLikeByUserAndProductId = async ({ productUuid, userUuid }) => {
  const like = await LikeRepository.getLikeByUserAndProductId({ productUuid, userUuid });
  return like;
};






