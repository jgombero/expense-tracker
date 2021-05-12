const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const expensesRouter = require("./routes/expenses");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const { connection } = mongoose;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use(cors());
app.use(express.json());

app.use("/expenses", expensesRouter);

app.listen(port, () => {
  console.log(`🚀 Server is running on port: ${port} 🚀`);
});
