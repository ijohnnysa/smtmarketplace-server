import Sequelize from 'sequelize';

import Shop from '../app/models/Shop';
import Product from '../app/models/Product';
import Stock from '../app/models/Stock';

import databaseConfig from '../config/database';

const models = [Shop, Product, Stock];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
