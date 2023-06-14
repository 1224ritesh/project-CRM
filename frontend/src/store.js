import { configureStore } from '@reduxjs/toolkit';

//import reducers here
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    }, //reducers go here //reducer is a function that returns a piece of state 

    //middleware is a function that can modify actions before they reach the reducer  
    // it can also modify the state before it reaches the reducer 
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),

    devTools: true,//this is for redux dev tools

});


export default store; 