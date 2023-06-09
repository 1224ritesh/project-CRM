import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const LoginScreen = () => {
  // set the state for the form inputs
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState("");

  // submit handler for the form
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <>
      <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
            
          <Form.Group className="my-2" controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              isValid={phoneNumber.length === 10}
              maxLength={10}
              minLength={10}
              type="phoneNumber"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              isValid={validPassword}
              maxLength={16}
              minLength={4}
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                password.length < 4
                  ? setValidPassword(false)
                  : setValidPassword(true);
                setPassword(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-2">
            <Link
              to="/login"
              className="text-white"
              style={{ textDecoration: "none" }}
            >
              Sign In
            </Link>
          </Button>

          <Row className="py-3">
            <Col>
              New Customer? <Link to="/register">Register</Link>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
