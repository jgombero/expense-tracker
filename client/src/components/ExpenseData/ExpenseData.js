import React from "react";
import useAxios from "axios-hooks";
import { Container } from "react-bootstrap";
import MaterialTable from "material-table";
import { tableIcons, columns, title, subtitle } from "./constants/constants";
import Header from "../Header/Header";

const ExpenseData = () => {
  const [{ data: getData, loading: getLoading, error: getError }, refetch] = useAxios(
    "http://localhost:8000/expenses"
  );

  const [{ data: deleteData, loading: deleteLoading, error: deleteError }, deleteExpense] =
    useAxios(
      {
        method: "DELETE",
      },
      {
        manual: true,
      }
    );

  const handleDelete = (event, rowData) => {
    const id = rowData._id;
    // eslint-disable-next-line no-restricted-globals
    const confirmDelete = confirm(`Are you sure you want to delete ${rowData.name}?`);

    if (confirmDelete) {
      deleteExpense({
        url: `http://localhost:8000/expenses/delete/${id}`,
      });
    }
    refetch();
  };

  if (getLoading || deleteLoading) {
    // Show loading indicator
  }

  if (getError || deleteError) {
    // Show the user a useful error message
  }

  return (
    <>
      <Header title={title} subtitle={subtitle} />
      <Container>
        {getData && getData.length > 0 && (
          <MaterialTable
            title="Expenses"
            columns={columns}
            data={getData}
            icons={tableIcons}
            actions={[
              {
                icon: tableIcons.Delete,
                tooltip: "Delete Expense",
                onClick: (event, rowData) => handleDelete(event, rowData),
              },
            ]}
          />
        )}
      </Container>
    </>
  );
};

export default ExpenseData;
