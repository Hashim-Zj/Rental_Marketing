import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';

function Header() {
  return (
    <div>
      <Navbar bg="light" expand="lg" className="shadow-sm p-0 mb-5 "fixed="top">
        <Container>
          <Navbar.Brand
            href={"home"}
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
              <Nav.Link href={"home"}>Home</Nav.Link>
              <Nav.Link href="#about">Rent Items</Nav.Link>
              <Nav.Link href={"list-myitems"}>Your Items</Nav.Link>
              <Nav.Link href="#contact">Your Bookings</Nav.Link>
              <Nav.Link href={"/profile"}>Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header