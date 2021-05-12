import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";

function App() {
  return (
    <Router>
      <Route path="/" exact component={ExpenseForm} />
      <Route path="/expenses" exact />
    </Router>
  );
}

export default App;
