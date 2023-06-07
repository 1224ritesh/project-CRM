import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';

// protect routes from unauthorized users 
const protect = asyncHandler(async (req, res, next) => {

    //
    let tokken;
    // check if tokken is present
    tokken = req.cookies.jwt;
    if (tokken) {
        // verify the tokken and get the user id from it 
        try{
            const decoded = jwt.verify(tokken, process.env.JWT_SECRET)
            // get the user data from the database and set it to the req.user 
            req.user = await User.findById(decoded.userId).select('-password');

            next();
        }catch(error){
            res.status(401);
            throw new Error('Not authorized, invalid tokken');
        }
    }else{
        res.status(401);
        throw new Error('Not authorized, no tokken');
    }
    
});

// latter add the admin middleware here and use it in the routes and controllers and protect the routes from unauthorized users





export { protect };