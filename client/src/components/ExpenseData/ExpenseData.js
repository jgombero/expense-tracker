import React, { useState, useEffect } from "react";
import useAxios from "axios-hooks";
import { Container } from "react-bootstrap";
import MaterialTable from "material-table";
import { tableIcons, columns, title, subtitle } from "./constants/constants";
import Header from "../Header/Header";
import Spinner from "../CustomSpinner/CustomSpinner";
import CustomModal from "../CustomModal/CustomModal";

const ExpenseData = () => {
  // --- Hooks --- //
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [state, setState] = useState({ name: "", id: "" });

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

  // --- Helper Functions --- //
  const handleCloseSuccessModal = () => setShowSuccessModal(false);

  const handleShowSuccessModal = () => setShowSuccessModal(true);

  const handleDeleteClick = (rowData) => {
    setState({ id: rowData._id, name: rowData.name });
    handleShowSuccessModal();
  };

  const handleDelete = () => {
    handleCloseSuccessModal();
    setIsLoading(true);

    // SetTimeout used here just to show off the spinner :)
    setTimeout(() => {
      deleteExpense({
        url: `http://localhost:8000/expenses/delete/${state.id}`,
      }).then(() => {
        refetch();
        setIsLoading(false);
      });
    }, 1000);
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
                onClick: (event, rowData) => handleDeleteClick(rowData),
              },
            ]}
          />
        )}
        <CustomModal
          title={`Are you sure you want to delete "${state.name}"?`}
          subtext={"This action cannot be undone!"}
          handleClose={handleCloseSuccessModal}
          show={showSuccessModal}
          handleConfirm={handleDelete}
        />
      </Container>
    </>
  );
};

export default ExpenseData;
