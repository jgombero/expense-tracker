import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./components/Navbar/Navbar";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseData from "./components/ExpenseData/ExpenseData";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Route path="/" exact component={ExpenseForm} />
      <Route path="/expenses" exact component={ExpenseData} />
    </Router>
  );
}

export default App;
