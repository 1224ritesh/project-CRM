import jwt from 'jsonwebtoken';

// Generate token for user authentication
const generateToken = (res, userId) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '7 days'
    });

    // token will be set it in the cookie 
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 7*24*60*60*1000,
       // expires: new Date(Date.now() + 7*24*60*60*1000),


        // cookie will be set only in the same domain because of csrf attack
        // csrf attack is when a malicious user tries to change the cookie value
        sameSite: 'strict'

    });
}


export default generateToken;