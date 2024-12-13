import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

import sales from "./../assets/images/sales.jpeg";
import rentel from "./../assets/images/rentel.jpeg";
import reuse from "./../assets/images/reuse.png";

function InfoSections() {
  const features = [
    { 
      title: "Sell Your Inventory", 
      text: "Easily sell your unused or surplus inventory with our user-friendly platform.", 
      img: `${sales}` 
    },
    { 
      title: "Rent From Surroundings", 
      text: "Discover rental opportunities nearby and save costs on purchases.", 
      img: `${rentel}` 
    },
    { 
      title: "Reuse Your Items", 
      text: "Promote sustainability by reusing items and reducing waste.", 
      img: `${reuse}` 
    },
  ];

  return (
    <div>
      <Container className="my-5">
      <Row>
        {features.map((feature, idx) => (
          <Col md={4} key={idx} className="mb-4">
            <Card className="info-card shadow-sm mx-3">
              <Card.Img variant="top" src={feature.img} className="card-img" />
              <Card.Body style={{ height: "150px", backgroundColor: "lightgray" }}>
                <Card.Title className='text-center fw-semi-bold'>{feature.title}</Card.Title>
                <hr />
                <Card.Text>{feature.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </div>
  );
}

export default InfoSections;
