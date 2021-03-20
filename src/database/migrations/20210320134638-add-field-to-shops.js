module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('products', 'shop_id', {
      type: Sequelize.INTEGER,
      references: { model: 'shops', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    }),

  down: (queryInterface) => queryInterface.removeColumn('products', 'shop_id'),
};
