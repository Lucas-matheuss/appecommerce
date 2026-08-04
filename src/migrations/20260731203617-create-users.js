'use strict';

export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      role: { type: Sequelize.ENUM('user', 'admin'), allowNull: false, defaultValue: 'user'},
      createdAt: { type: Sequelize.DATE, allowNull: false},
      updatedAt: { type: Sequelize.Date, allowNull: false}
    })
}

export async function down(queryInterface) {
    await queryInterface.dropTable('Users')
}

