import React from "react";
import spinnerImage from "../../images/coin-image.png";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <img src={spinnerImage} alt="loading" className="spinner" />
    </div>
  );
};

export default Spinner;
