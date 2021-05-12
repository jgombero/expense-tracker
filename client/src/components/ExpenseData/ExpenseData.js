import React from "react";
import useAxios from "axios-hooks";
import { Container } from "react-bootstrap";
import MaterialTable from "material-table";
import { tableIcons, columns, title, subtitle } from "./constants/constants";
import Header from "../Header/Header";

const ExpenseData = () => {
  const [{ data: getData, loading: getLoading, error: getError }] = useAxios(
    "http://localhost:8000/expenses"
  );

  if (getLoading) {
    // Show loading indicator
  }

  if (getError) {
    // Show the user a useful error message
  }

  return (
    <>
      <Header title={title} subtitle={subtitle} />
      <Container>
        {getData && getData.length > 0 && (
          <MaterialTable title="Expenses" columns={columns} data={getData} icons={tableIcons} />
        )}
      </Container>
    </>
  );
};

export default ExpenseData;
