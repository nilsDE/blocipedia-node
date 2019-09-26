'use strict';

const faker = require("faker");

let wikis = [];

for (let i = 1; i < 6; i++) {
  wikis.push({
    title: faker.hacker.noun(),
    body: faker.hacker.phrase(),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: faker.random.number({min:5, max:25}),
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Wikis", wikis, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Wikis", null, {});
  }
};
