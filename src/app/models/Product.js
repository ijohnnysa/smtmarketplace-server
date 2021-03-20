import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        price: Sequelize.NUMBER,
        image: Sequelize.STRING,
        image_path: Sequelize.STRING,
        image_url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/images/products/${this.image_path}`;
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Shop, { foreignKey: 'shop_id', as: 'shop' });
  }
}

export default Product;
