import { LikeRepository } from "../repositories";

export const getLikes = async () => {
  const likes = await LikeRepository.findAll();

  return likes;
};

export const isLike = async ({ productUuid, userUuid }) => {
  const isLike = await LikeRepository.isLike({ productUuid, userUuid });

  return isLike;
};

export const doLike = async ({ productUuid, userUuid, isLike }) => {
  const dolike = await LikeRepository.doLike({ productUuid, userUuid, isLike });
  return dolike;
};



