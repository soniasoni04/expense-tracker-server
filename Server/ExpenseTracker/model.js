const Sequelize = require("sequelize");
const sequelize = require("../db");

const Expense = sequelize.define("expense", {
  amount: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: true
  },
  chosenDate: {
    type: Sequelize.STRING,
    allowNull: false
  },
  comments: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = Expense;