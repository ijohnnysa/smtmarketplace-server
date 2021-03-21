module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('stocks', 'product_id', {
      type: Sequelize.INTEGER,
      references: { model: 'products', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    }),

  down: (queryInterface) => queryInterface.removeColumn('stocks', 'product_id'),
};
