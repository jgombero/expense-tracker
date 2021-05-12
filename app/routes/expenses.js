const router = require("express").Router();
const Expense = require("../db/models/expense.model");

router.route("/").get((req, res) => {
  Expense.find()
    .then((expenses) => res.json(expenses))
    .catch((e) => res.status(500).json(`Error: ${e}`));
});
