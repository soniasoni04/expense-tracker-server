const { Router } = require("express");
const Expense = require("./model");
const db = require('../db');

const router = new Router();

router.post("/users/expense", (req, res, next) => {
  Expense.create({
    amount: req.body.amount,
    category: req.body.category,
    chosenDate: req.body.chosenDate,
    comments: req.body.comments,
  })
    .then(expense => res.json(expense))

    .catch(next);
});

//get all the data for expense table

router.get("/users/expense", async (req, res, next) => {
  try {
    const expense = await Expense.findAll()
    res
      .status(200)
      .send(expense)
  }
  catch (error) {
    next(error)
  }
})

//get all the data for expense table 
// dateStart , dateEnd

router.post("/users/expense/date", async (req, res, next) => {
  try {
    const expenseData = await db.query(
      'select * from "expenses" where "expenses"."chosenDate" >= (:startDate)  and "expenses"."chosenDate" <= (:endDate) ',
      {
        replacements: { startDate: req.body.startDate, endDate: req.body.endDate },
        type: db.QueryTypes.SELECT
      }
    )

    res.status(200)
    res.send(expenseData)
  }
  catch (error) {
    next(error)
  }
})



module.exports = router;
