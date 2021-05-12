const mongoose = require("mongoose");

const { Schema } = mongoose;

const expenseSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      unique: false,
    },
    cost: {
      type: Number,
      required: true,
      trim: true,
      unique: false,
    },
    category: {
      type: String,
      require: true,
      trim: true,
      unique: false,
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
