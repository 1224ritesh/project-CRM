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
  const {name, email, phoneNumber, password, memberID} = req.body;

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
    password,
    memberID
  });

  // if user is created successfully
  if(user){

    // generate a token for the user and set it in the cookie
    generateToken(res, user._id)


    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      memberID: user.memberID
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
  // get the user data from the request
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    phoneNumber: req.user.phoneNumber,
    memberID: req.user.memberID
  }
  res.status(200).json(user);
});

// @desc    update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  // get the user data from the request
  const user = await User.findById(req.user._id);

  // if user is found then update the user data
  if(user){
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

    // if password is provided then update the password
    if(req.body.password){
      user.password = req.body.password;
    }

    // save the updated user data
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber
    });
  }else{
    res.status(404);
    throw new Error("User not found");
  }
 
});


export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile
};
