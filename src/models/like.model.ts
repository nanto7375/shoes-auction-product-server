import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

class Like extends Model {
  public id!: number;
  public uuid!: string;
  public productUuid!: string;
  public userUuid!: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}

type LikeStatic = typeof Model & {
  new ( values?: Record<string, unknown>, options?: BuildOptions ): Like;
};

const LikeFactory = ( sequelize : Sequelize ): LikeStatic => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: false,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    uuid: {
      comment: '좋아요 uuid',
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    productUuid: {
      type: DataTypes.STRING, 
      comment: '관심상품 uuid',
    },
    userUuid: {
      comment: '회원 uuid',
      type: DataTypes.STRING,
    },
  };
  
  const Like = <LikeStatic>sequelize.define( 'likes', attributes, { 
    paranoid: true, 
    underscored: true, 
    comment: '좋아요',
  });

  return Like;
};

export default LikeFactory;
