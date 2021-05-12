import React, { useState, useEffect } from "react";
import useAxios from "axios-hooks";
import { Container } from "react-bootstrap";
import MaterialTable from "material-table";
import { tableIcons, columns, title, subtitle } from "./constants/constants";
import Header from "../Header/Header";
import Spinner from "../CustomSpinner/CustomSpinner";

const ExpenseData = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [{ data: getData, loading: getLoading, error: getError }, refetch] = useAxios(
    "http://localhost:8000/expenses"
  );

  const [{ loading: deleteLoading, error: deleteError }, deleteExpense] = useAxios(
    {
      method: "DELETE",
    },
    {
      manual: true,
    }
  );

  useEffect(() => {
    setIsLoading(true);
    // SetTimeout used here just to show off the spinner :)
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleDelete = (rowData) => {
    const id = rowData._id;
    // eslint-disable-next-line no-restricted-globals
    const confirmDelete = confirm(`Are you sure you want to delete ${rowData.name}?`);

    if (confirmDelete) {
      setIsLoading(true);

      // SetTimeout used here just to show off the spinner :)
      setTimeout(() => {
        deleteExpense({
          url: `http://localhost:8000/expenses/delete/${id}`,
        }).then(() => {
          refetch();
          setIsLoading(false);
        });
      }, 1000);
    }
  };

  if (getLoading || deleteLoading || isLoading) {
    return <Spinner />;
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
                onClick: (rowData) => handleDelete(rowData),
              },
            ]}
          />
        )}
      </Container>
    </>
  );
};

export default ExpenseData;
