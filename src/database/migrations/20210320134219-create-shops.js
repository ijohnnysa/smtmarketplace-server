module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('shops', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      trade_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      business_identification: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telephone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      legal_representative: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('shops'),
};
