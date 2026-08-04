'use strict';


export async function up (queryInterface, Sequelize) {
   await queryInterface.createTable('CartItems', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
      type: Sequelize.INTEGER,
      references: { model: 'Users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    productId: {
      type: Sequelize.INTEGER,
      references: { model: 'Products', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    orderId: {
      type: Sequelize.INTEGER,
      references: { model: 'Orders', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    quantity: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
    createAt: { type: Sequelize.DATE, allowNull: false },
    updatedAt: { type: Sequelize.DATE, allowNull: false }
   })
}

export async function down (queryInterface) {
    await queryInterface.dropTable('CartItems')
}

