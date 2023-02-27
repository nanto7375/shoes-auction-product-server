import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import revalidator from 'revalidator';

const schemaValidator = function ( schema ) {
  return function ( value ) {
    const results = revalidator.validate( value, schema );
    if ( !results.valid ) throw new Error( JSON.stringify( results.errors ) );
  };
};

class Product extends Model {
  public id!: number;
  public uuid!: string;
  public brand!: string;
  public name!: string;
  public price!: number;
  public userUuid!: string;
  public status!: 'SELLING'|'WAITING'|'SOLD'|'FAILED';
  public image!: string;
  public info!: Record<string, any>;
  public auctionEndDate!: Date;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}

type ProductStatic = typeof Model & {
  new ( values?: Record<string, unknown>, options?: BuildOptions ): Product;
};

const ProductFactory = ( sequelize : Sequelize ): ProductStatic => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: false,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    uuid: {
      comment: '상품 uuid',
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    brand: {
      comment: '브랜드명',
      type: DataTypes.STRING,
      defaultValue: 'handmade',
    },
    name: {
      comment: '상품명',
      type: DataTypes.STRING,
      notNull: true,
    },
    price: {
      comment: '상품 가격',
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    userUuid: {
      comment: '판매자 uuid',
      type: DataTypes.STRING,
      notNull: true,
    },
    status: {
      comment: '상품 상태',
      type: DataTypes.ENUM( 'SELLING','WAITING','SOLD','FAILED' ),
      defaultValue: 'SELLING',
    },
    image: {
      comment: '상품 이미지',
      type: DataTypes.STRING,
    },
    info: {
      comment: '상품 상세',
      type: DataTypes.JSON,
      validate: { schema: schemaValidator({ type: 'object' }) },
      defaultValue: {},
      get() {
        const originInfo = this.getDataValue( 'info' );
        if( typeof originInfo === 'string' ){
          return JSON.parse( originInfo );
        }
        return originInfo;
      },
    },
    auction_end_date: {
      comment: '경매 마감 날짜',
      type: DataTypes.DATE,
      notNull:true,
    },
  };
  
  const Product = <ProductStatic>sequelize.define( 'products', attributes, { 
    paranoid: true, 
    underscored: true, 
    comment: '상품 정보',
  });

  return Product;
};

export default ProductFactory;
