import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

function HeroNavbar() {
  return (
    <div>
      <Navbar bg="light" expand="lg" className="shadow-sm p-0 "fixed="top">
        <Container>
          <Navbar.Brand
            href="#home"
            className="fw-5 fs-3"
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            Marketing
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default HeroNavbar;
