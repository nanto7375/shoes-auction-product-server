import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

class Auction extends Model {
  public id!: number;
  public uuid!: string;
  public productUuid!: string;
  public userUuid!: string;
  public bidPrice!: number;
  public result!: boolean;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}

type AuctionStatic = typeof Model & {
  new ( values?: Record<string, unknown>, options?: BuildOptions ): Auction;
};

const AuctionFactory = ( sequelize : Sequelize ): AuctionStatic => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: false,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    uuid: {
      comment: '입찰 uuid',
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    productUuid: {
      type: DataTypes.STRING, 
      comment: '상품 uuid',
    },
    userUuid: {
      comment: '입찰자 uuid',
      type: DataTypes.STRING,
    },
    bidPrice: {
      comment: '입찰 가격',
      type: DataTypes.INTEGER,
      notNull: true,
    },
    result: {
      comment: '낙찰 여부',
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  };
  
  const Auction = <AuctionStatic>sequelize.define( 'auctions', attributes, { 
    paranoid: true, 
    underscored: true, 
    comment: '입찰 정보',
  });

  return Auction;
};

export default AuctionFactory;
