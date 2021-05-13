const router = require("express").Router();
const Expense = require("../db/models/expense.model");

router.route("/").get((req, res) => {
  Expense.find()
    .then((expenses) => res.json(expenses.reverse()))
    .catch((e) => res.status(400).json(`Error: ${e}`));
});

router.route("/add").post((req, res) => {
  const { name, cost, category } = req.body;

  const newEntry = new Expense({ name, cost, category });

  newEntry
    .save()
    .then(() => res.json("Entry added!"))
    .catch((e) => res.status(400).json(`Error: ${e}`));
});

router.route("/delete/:id").delete((req, res) => {
  Expense.findOneAndDelete({ _id: req.params.id })
    .then(() => res.json("Entry deleted!"))
    .catch((e) => res.status(400).json(`Error: ${e}`));
});

module.exports = router;
