import { LikeRepository } from "../repositories";

export const getLikes = async () => {
  const likes = await LikeRepository.findAll();

  return likes;
};


