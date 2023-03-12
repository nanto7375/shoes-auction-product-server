import db from "../models";

const { Like } = db;

export const findAll = async () => {
  const likes = await Like.findAll();
  return likes;
};

export const isLike = async ({ productUuid, userUuid }) => {
  const isLike = await Like.findOne({ where: { productUuid, userUuid } });
  return isLike;  
};

export const doLike = async ({ productUuid, userUuid }) => {
  // ! doLike는 좋아요를 한다는 의미인데, 좋아요 해제도 시키는 건 doLike의 의미에 맞아 보이지 않음!
  // ! 차라리 route 단에서 isLike를 체크해서 함수 실행을 분기시키는 게 어떨가 싶음!
  // ! 그러면 isLike를 줄줄이 보낼 필요 없으니까 매개변수도 줄어들고!
  // ! 내가 알기로는 flag변수(isLike) 체크 같은 분기가 일어나는 지점은 최대한 앞으로 당기고
  // ! 마지막 실행함수는 최소한의 기능만을 하는 게 좋다고 알고 있음! (테스트코드 작성 관점에서?)
  // ! 내가 말하는것들에서 혹 잘못된 거 있으면 편하게 이야기해주삼!
    
  // ! 근데 이것도 역시 내가 말한 거 따를 필요 없음. 너의 확실한 생각만 있다면, 너 마음대로 해도 됨!
  // ! 의지가 굳은 사람은 세상을 자기에게 맞춘다 - 요한 볼프강 폰 괴테 -
  
  // findAllCreate? 시퀄라이저에서 제공하는 함수가 있을 것 같은데 찾아보고 적용해보는 건 어떨까?
  
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


