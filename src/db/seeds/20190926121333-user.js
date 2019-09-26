'use strict';

const bcrypt = require("bcryptjs"); 

const salt = bcrypt.genSaltSync(10);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'John',
      email: 'demo@demo.com',
      password: bcrypt.hashSync('123456', salt),
      createdAt: new Date(),
      updatedAt: new Date(),
      role: "standard",
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
