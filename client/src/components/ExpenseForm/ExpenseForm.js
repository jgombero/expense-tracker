import React, { useState } from "react";
import useAxios from "axios-hooks";
import { Container, Form, Col, Button } from "react-bootstrap";
import { defaultState, categories } from "./constants/constants";

const ExpenseForm = () => {
  const [state, setState] = useState(defaultState);

  const [{ loading, error }, submitForm] = useAxios(
    {
      url: "http://localhost:8000/expenses/add",
      method: "POST",
    },
    {
      manual: true,
    }
  );

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
      resetState(defaultState);
    });
  };

  if (loading) {
    // Show loading indicator
  }

  if (error) {
    // Show the user a useful error message
  }

  return (
    <>
      <Container>
        <Form onSubmit={(event) => onSubmitHandler(event)}>
          <Form.Label>Name</Form.Label>
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
          <Form.Label>Cost</Form.Label>
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
          <Form.Label>Category</Form.Label>
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
        </Form>
      </Container>
    </>
  );
};

export default ExpenseForm;
