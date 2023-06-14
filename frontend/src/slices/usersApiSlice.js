import { apiSlice } from "./apiSlice";

// this is the url that we are going to use to make the request to the backend
const USERS_URL = "/api/users";

// it is allows to do create a own endpoints this file and it will inject them into the apiSlice file where the endpoints are created endpoints: (builder) => ({}) so that means we are using dependency injection to inject the endpoints into the apiSlice file
export const usersApiSlice = apiSlice.injectEndpoints({


    endpoints: (builder) => ({

        // this login endpoint is going to be used in the frontend to make the request to the backend to login and it is going to be a mutation because we are going to be changing the state of the backend by logging in and we are going to be changing the state of the frontend by logging in.
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: "POST",
                body: data,
            }),
        }),

        // this register endpoint is going to be used in the frontend to make the request to the backend to register and it is going to be a mutation because we are going to be changing the state of the backend by registering and we are going to be changing the state of the frontend by registering.
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "POST",
                body: data,
            }),
        }),

        // this logout endpoint is going to be used in the frontend to make the request to the backend to logout and it is going to be a mutation because  going to be changing the state of the backend by logging out and going to be changing the state of the frontend by logging out.
        logout: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
                body: data,
            }),
        }),

        // this updateUser endpoint is going to be used in the frontend to make the request to the backend to update the user and it is going to be a mutation because we are going to be changing the state of the backend by updating the user and we are going to be changing the state of the frontend by updating the user
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: "PUT",
                body: data,
            }),
        }),

    }),
})

// we are exporting the login endpoint so that we can use it in the frontend to make the request to the backend to login
// specific convention for using the mutation need to "use" and the name Login and then Mutation like this useLoginMutation
export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation } = usersApiSlice;