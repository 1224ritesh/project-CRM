import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    //if there is a userInfo in local storage then set it to userInfo else set it to null
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null //null is the default value
};

//this slice is used to store the user info. It's not used anywhere in the app.
//It's just a way to store the user info in local storage.
//The slice itself is just a function that returns an object.
//The object returned by the slice function has a reducer property that is a function.
//The reducer function takes in an action object and an object that contains the state of the slice.
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //this reducer is called when the user logs in
        // setCredentials is the function that sets the user info in the slice state and in local storage.
        setCredentials: (state, action) => {

            //set the user info in local storage to the user info in the action payload
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        //this reducer is called when the user logs out
        //logout is the function that removes the user info from the slice state and from local storage.
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
        
    }  
});

//export the setCredentials and logout functions from the slice object
export const { setCredentials, logout } = authSlice.actions;


export default authSlice.reducer; //export the reducer function from the slice object