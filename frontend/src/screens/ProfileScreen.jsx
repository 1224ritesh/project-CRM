import { useState, useEffect } from "react";

import { Form, Button,  } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import{toast} from 'react-toastify';
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import {useUpdateUserMutation} from "../slices/usersApiSlice"

const ProfileScreen = () => {
  // set the state for the form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [memberID, setMemberID] = useState("");

  
  const dispatch = useDispatch();

  // any component want the user data from the store will use useSelector hook. and pass the state to it as a parameter. this line will use in any component wants the user info
  const {userInfo} = useSelector( (state)  => state.auth);

  // this isle is used to update the user info in the store. 
  const [updateProfile,{isLoading}] = useUpdateUserMutation();
  

  // useEffect hook will run when the component is mounted. it will check if the user is already logged in. if yes, it will redirect to the home page. if not, it will not run.
  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPhoneNumber(userInfo.phoneNumber);

  }, [userInfo.name, userInfo.email, userInfo.phoneNumber]);



  // submit handler for the form
  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      toast.error('Passwords do not match')
    }else{
      try {
        // update the user info in the store. 
        const res = await updateProfile({
          _id:userInfo._id,
          name,
          email,
          phoneNumber,
          password,
          userType,
          memberID
        }).unwrap();// this is the payload that we will send to the server.
        dispatch(setCredentials({...res}));// this will update the user info in the store.
        toast.success('Profile Updated Successfully')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <>
      <FormContainer>
        <h1>Update Profile</h1>
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

            <Form.Group className="my-2" controlId="userType">
            <Form.Label>User Type</Form.Label>
            <Form.Control
              as="select"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="">Select User Type</option>
              <option value="CA">CA</option>
              <option value="CS">CS</option>
            </Form.Control>
          </Form.Group>

          {userType === "CA" && (
            <Form.Group className="my-2" controlId="caMemberID">
              <Form.Label>CA Member ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter CA Member ID"
                value={memberID}
                onChange={(e) => setMemberID(e.target.value)}
              />
            </Form.Group>
          )}

          {userType === "CS" && (
            <Form.Group className="my-2" controlId="csMemberID">
              <Form.Label>CS Member ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter CS Member ID"
                value={memberID}
                onChange={(e) => setMemberID(e.target.value)}
              />
            </Form.Group>
          )}



          </Form.Group>
            {isLoading && <Loader/>}
          <Button type="submit" variant="primary" className="mt-2 text-white">
            Update 
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};
export default ProfileScreen;
