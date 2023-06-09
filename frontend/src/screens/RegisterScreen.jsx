import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import{toast} from 'react-toastify';
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const RegisterScreen = () => {
  // set the state for the form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // any component want the user data from the store will use useSelector hook. and pass the state to it as a parameter. this line will use in any component wants the user info
  const {userInfo} = useSelector( (state)  => state.auth);
  

  // useRegisterMutation hook will return an array of 2 elements. the first element is the function to call the api. the second element is the state of the api.
  const [register, {  isLoading }] = useRegisterMutation();

  // useEffect hook will run when the component is mounted. it will check if the user is already logged in. if yes, it will redirect to the home page. if not, it will not run.
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);


  // submit handler for the form
  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      toast.error('Passwords do not match')
    }else{
      try {
        // this will dispatch the login action to the store. it will return the data, error and isLoading.
        // unwrap() is a function that will return the data if there is no error. if there is an error it will throw it. it is a function from the RTK Query. it returns a promise.
        const res = await register({name, email, phoneNumber, password }).unwrap();
        // dispatch the setCredentials action to the store.
        dispatch(setCredentials({...res}));
        navigate("/");
        
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  }

  return (
    <>
      <FormContainer>
        <h1>Sign Up</h1>
        <Form onSubmit={submitHandler}>

            <Form.Group className="my-2" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            
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
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {isLoading && <Loader />}

          <Button type="submit" variant="primary" className="mt-2 text-white">
            Sign Up
          </Button>

          <Row className="py-3">
            <Col>
              Already have an account? <Link to="/login">Log In</Link>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </>
  );
};
export default RegisterScreen;
