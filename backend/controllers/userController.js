import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";





// @desc    Auth user/set token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {

  // get data from the body
  const {phoneNumber, password} = req.body;

  // checks if user already exists in the database or not
  const user = await User.findOne({phoneNumber});

  // if user is found and password is matched then send the user data in the response and set the token in the cookie 
  if(user && (await user.matchPassword(password))){
    generateToken(res, user._id)
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber
    });
  } else {
    res.status(401);
    throw new Error("Invalid phone number or password");
  }

});




// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {

  // get data from the body
  const {name, email, phoneNumber, password} = req.body;

  // checks if user already exists in the database or not
  const userExist = await User.findOne({phoneNumber});
  if(userExist){
    res.status(400);
    throw new Error("User is already exists");
  }

  // create a new user
  const user = await User.create({
    name,
    email,
    phoneNumber,
    password
  });

  // if user is created successfully
  if(user){

    // generate a token for the user and set it in the cookie
    generateToken(res, user._id)


    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber
    });
  }else{
    res.status(400);
    throw new Error("Invalid user data");
  }
});



// @desc    Logout user
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler((req, res) => {

  // clear the cookie and send the response with message
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({ message: "You are successfully logged out" });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler((req, res) => {
  res.status(200).json({ message: "user profile" });
});

// @desc    update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler((req, res) => {
  res.status(200).json({ message: "update user profile" });
});


export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile
};
