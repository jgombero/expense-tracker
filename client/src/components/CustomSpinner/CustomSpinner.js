import React from "react";
import { spinnerURL } from "./constants/constants";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <img src={spinnerURL} alt="loading" className="spinner" />
    </div>
  );
};

export default Spinner;
