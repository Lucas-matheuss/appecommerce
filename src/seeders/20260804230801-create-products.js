'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Products', [
    {
      name: 'Notebook Gamer',
      //description: 'Notebook potente para jogos e desenvolvimento',
      price: 5500.00,
      //stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Smartphone X',
      //description: 'Celular moderno com câmera avançada',
      price: 3200.00,
      //stock: 20,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Fone Bluetooth',
      //description: 'Fone sem fio com cancelamento de ruído',
      price: 450.00,
      //stock: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Products', null, {});
}
