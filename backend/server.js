import express from "express";
import dotenv from "dotenv";

dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

const port = process.env.PORT || 9000;

import userRoutes from './routes/userRoutes.js'

connectDB();

const app = express();

// middleware to parse json data in the body
app.use(express.json());
// middleware to parse form data in the body and that allows to form data as well 
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', userRoutes);

app.get('/', (req, res) =>{
    res.send('server is ready steady go')
});

// error middleware
app.use(notFound);
app.use(errorHandler);


// - **POST /api/users** - Register a new user
// - **POST /api/users/auth** - Authenticate a user and return a token
// - **POST /api/users/logout** - Logout a user and clear cookie
// - **GET /api/users/profile** - Get user profile
// - **POST /api/users/profile** - Update user profile



app.listen(port, () => {
    console.log(`server started on port ${port}`);
})