import React, { useState } from "react";
import useAxios from "axios-hooks";
import { Container, Form, Col, Button } from "react-bootstrap";
import {
  defaultState,
  categories,
  title,
  subtitle,
  modalTitle,
  modalSubtext,
} from "./constants/constants";
import Header from "../Header/Header";
import Asterisk from "./Asterisk";
import CustomModal from "./CustomModal";
import Spinner from "../CustomSpinner/CustomSpinner";

const ExpenseForm = () => {
  const [state, setState] = useState(defaultState);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [{ loading, error }, submitForm] = useAxios(
    {
      url: "http://localhost:8000/expenses/add",
      method: "POST",
    },
    {
      manual: true,
    }
  );

  const handleCloseSuccessModal = () => setShowSuccessModal(false);

  const handleShowSuccessModal = () => setShowSuccessModal(true);

  const resetState = (defaultState) => {
    setState(defaultState);
  };

  const onChangeHandler = (key, event) => {
    setState({ ...state, [key]: event.target.value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      name: state.name,
      cost: state.cost,
      category: state.category,
    };

    submitForm({ data: { ...expenseData } }).then((res) => {
      handleShowSuccessModal();
      resetState(defaultState);
    });
  };

  if (loading) {
    // Show loading indicator
    return <Spinner />;
  }

  if (error) {
    // Show the user a useful error message
  }

  return (
    <>
      <Header title={title} subtitle={subtitle} />
      <Container>
        <Form onSubmit={(event) => onSubmitHandler(event)}>
          <Form.Label>
            Name
            <Asterisk />
          </Form.Label>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="formGridName">
              <Form.Control
                required
                type="text"
                placeholder="Ex. Rent"
                value={state.name}
                onChange={(event) => onChangeHandler("name", event)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Label>
            Cost
            <Asterisk />
          </Form.Label>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="formGridCost">
              <Form.Control
                required
                type="number"
                placholder={0}
                min={0.01}
                step={0.01}
                value={state.cost}
                onChange={(event) => onChangeHandler("cost", event)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Label>
            Category
            <Asterisk />
          </Form.Label>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="formGridCategory">
              <Form.Control
                as="select"
                value={state.category}
                onChange={(event) => onChangeHandler("category", event)}
              >
                {categories.map((category, index) => {
                  return <option key={index}>{category}</option>;
                })}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Button type="submit">Submit</Button>
          <Form.Text className="text-muted">
            All fields marked with <Asterisk /> are required
          </Form.Text>
        </Form>
        <CustomModal
          title={modalTitle}
          subtext={modalSubtext}
          handleClose={handleCloseSuccessModal}
          show={showSuccessModal}
        />
      </Container>
    </>
  );
};

export default ExpenseForm;
