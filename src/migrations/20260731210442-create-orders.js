'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Orders', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
       type: Sequelize.INTEGER, 
       references: { model: 'Users', key: 'id' },
       onUpdate: 'CASCADE',
       onDelete: 'CASCADE'
    },
    status: { type: Sequelize.STRING, allowNull: false, defaultValue: 'pending' },
    total: { type: Sequelize.FLOAT, allowNull: false, defaultValue: 0 },
    creatAt: { type: Sequelize.DATE, allowNull: false },
    updatedAt: { type: Sequelize.DATE, allowNull: false }
  })
}

export async function down(queryInterface) {
  await queryInterface.dropTable('Orders')
}
