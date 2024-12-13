import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../Apis/feachApi";

function RegisterPage() {
  const [userReg, setUseRegister] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = userReg;
    if (!username || !email || !password) {
      toast.warning("Invalid Data");
    } else {
      userRegister(userReg)
        .then((res) => {
          toast.success("Registration Successful");
          navigate("/home");
        })
        .catch((err) => {
          toast.error("Registration Failed. Enter Valid Credentials.");
        });
    }
  };

  return (
    <div>
      <Container className="my-5">
        <Card className="p-4 shadow-sm" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <Card.Body>
            <Card.Title className="text-center mb-4">Register</Card.Title>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  onChange={(e) => setUseRegister({ ...userReg, username: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setUseRegister({ ...userReg, email: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setUseRegister({ ...userReg, password: e.target.value })}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="mt-4 w-100 d-flex justify-content-center align-items-center fw-bold"
                onClick={(e) => formSubmit(e)}
              >
                Register
              </Button>
              <Link to="/login" className="d-block text-center mt-3 text-muted">
                Already a user? Log in here.
              </Link>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default RegisterPage;
