import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Shop extends Model {
  static init(sequelize) {
    super.init(
      {
        trade_name: Sequelize.STRING,
        business_identification: Sequelize.STRING,
        company_name: Sequelize.STRING,
        address: Sequelize.STRING,
        telephone: Sequelize.STRING,
        legal_representative: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (shop) => {
      if (shop.password) {
        shop.password_hash = await bcrypt.hash(shop.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Shop;
