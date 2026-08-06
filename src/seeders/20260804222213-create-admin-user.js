'use strict';

export async function up(queryInterface, Sequelize) {

  await queryInterface.bulkInsert('Users', [{
    name: 'Admin',
    email: 'admin@email.com',
    password: 'admin123',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Users', { email: 'admin@email.com' }, {});
}
