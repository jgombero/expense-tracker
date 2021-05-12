import React, { useState } from "react";
import useAxios from "axios-hooks";
import { Container, Form, Col, Button } from "react-bootstrap";
import { defaultState, categories } from "./constants/constants";

const ExpenseForm = () => {
  const [state, setState] = useState(defaultState);

  const onSubmitHandler = (event) => {};

  const onChangeHandler = (key, event) => {};

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
                value={state.cost}
                onChange={(event) => onChangeHandler("cost", event)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Label>Category</Form.Label>
          <Form.Row>
            <Form.Group as={Col} md="2" controlId="formGridCategory">
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
