import { configureStore } from '@reduxjs/toolkit';


const store = configureStore({
    reducer: {}, //reducers go here //reducer is a function that returns a piece of state 

    //middleware is a function that returns a function that is called next that returns a function that is called action 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),

    devTools: true,//this is for redux dev tools

});


export default store; 