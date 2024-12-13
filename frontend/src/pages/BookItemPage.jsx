import React from 'react'
import { Form, Button, Container } from 'react-bootstrap';

function BookItemPage() {
  return (
    <div>
       <Container className="my-5">
    <h2>Book Item</h2>
    <Form>
      <Form.Group controlId="formItemName">
        <Form.Label>Item Name</Form.Label>
        <Form.Control type="text" placeholder="Enter item name" />
      </Form.Group>
      <Form.Group controlId="formBookingDate" className="mt-3">
        <Form.Label>Booking Date</Form.Label>
        <Form.Control type="date" />
      </Form.Group>
      <Form.Group controlId="formUserDetails" className="mt-3">
        <Form.Label>Your Details</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Enter your details" />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-4">
        Book Item
      </Button>
    </Form>
  </Container>
    </div>
  )
}

export default BookItemPage