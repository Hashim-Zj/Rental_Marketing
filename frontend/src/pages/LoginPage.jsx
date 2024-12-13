import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../Apis/feachApi";

function LoginPage() {
  const [logUser, setLogUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  console.log(logUser);

  const formSubmit = (e) => {
    e.preventDefault();
    const { username, password } = logUser;
    if (!username || !password) {
      toast.warning("Invalid Credentials");
    } else {
      userLogin(logUser)
        .then((res) => {
          console.log(res.data.token);
          sessionStorage.setItem("token", res.data.token);
          toast.success("Login Successful");
          navigate("/home");
        })
        .catch((err) => {
          toast.error("Login Failed. Enter Valid Credentials.");
        });
    }
  };

  return (
    <div className="d-flex flex-column-reverse flex-md-row">


      <Container className="my-5 d-flex justify-content-center">
        <Card style={{ width: "30rem" }} className="p-4">
          <Card.Body>
            <h2 className="text-center mb-3 ">Login to Marketing</h2>
            <Form onSubmit={formSubmit}>
              <Form.Group controlId="formUserName">
                <Form.Label>UserName</Form.Label>
                <Form.Control
                  type="text"
                  value={logUser.username}
                  onChange={(e) =>
                    setLogUser({ ...logUser, username: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={logUser.password}
                  onChange={(e) =>
                    setLogUser({ ...logUser, password: e.target.value })
                  }
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="mt-4 w-100 d-flex justify-content-center align-items-center fw-bold"
                onClick={(e) => formSubmit(e)}
              >
                Login
              </Button>

              <Link
                to={"/register"}
                className="d-block text-center mt-3 text-muted"
              >
                New User? Signup here.
              </Link>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default LoginPage;
