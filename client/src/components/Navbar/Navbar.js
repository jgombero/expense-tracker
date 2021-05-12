import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

const NavigationBar = () => {
  return (
    <section id="navbar" className="">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand className="title" href="/">
            Expense Tracker
          </Navbar.Brand>
          <Nav bg="dark" variant="dark" className="justify-content-end">
            <Nav.Link href="/">Form</Nav.Link>
            <Nav.Link href="/expenses">Expenses</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </section>
  );
};

export default NavigationBar;
