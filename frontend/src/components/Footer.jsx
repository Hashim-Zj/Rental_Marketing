import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <div>
      <footer className="bg-dark text-white py-4">
        <Container>
          <Row>
            <Col md={4}>
              <h5>Marketing</h5>
              <p>Your go-to rental platform.</p>
            </Col>
            <Col md={8}>
              <h5>Quick Links</h5>
              <ul className="list-unstyled d-flex flex-row justify-content-between flex-wrap me-5">
                <li><a href="#about" className="text-white">About</a></li>
                <li><a href="#features" className="text-white">Features</a></li>
                <li><a href="#contact" className="text-white">Contact</a></li>
              </ul>
            </Col>
          </Row>
          <p className="text-center mt-3">&copy; 2024 Marketing. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
}

export default Footer;
