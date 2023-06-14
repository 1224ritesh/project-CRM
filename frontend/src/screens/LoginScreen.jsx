import { useState, useEffect  } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import{toast} from 'react-toastify';
import Loader from "../components/Loader";

// useDispatch hook to dispatch actions to the store and useSelector select the global state from the store. 
import { useDispatch, useSelector } from "react-redux";


// import the actions from the usersApiSlice file to use them in the component.
import { useLoginMutation } from "../slices/usersApiSlice";

// import the setCredentials action from the authSlice file to set the user's credentials in the store.
import { setCredentials } from "../slices/authSlice";





const LoginScreen = () => {
  // set the state for the form inputs
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // use the useLoginMutation hook to dispatch the login action to the store. it do it automatically and return the data, error and isLoading.
  const [login, {  isLoading }] = useLoginMutation();

  // get the user data from the store "userInfo" is the name of the reducer in the store. to get the data use useSelector hook. and pass the state to it as a parameter.  
  const {userInfo} = useSelector( (state)  => state.auth);

  // useEffect hook to check if the user is already logged in and redirect him to the home page if he is.
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);


  // submit handler for the form
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // this will dispatch the login action to the store. it will return the data, error and isLoading.
      // unwrap() is a function that will return the data if there is no error. if there is an error it will throw it. it is a function from the RTK Query. it returns a promise.
      const res = await login({ phoneNumber, password }).unwrap();
      // dispatch the setCredentials action to the store.
      dispatch(setCredentials({...res}));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
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

             {isLoading && <Loader></Loader>}
          <Button type="submit" variant="primary" className="mt-2 text-white">
            Sign In
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
