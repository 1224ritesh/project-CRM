import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({baseUrl: ''});

export const apiSlice = createApi({
    baseQuery,

    // tagTypes is used to cache the data and use it later on in the app without making a new request to the server again and again for the same data.
    tagTypes: ['User'],

    // endpoints is used to define the different API calls that will be made in the app.
    // Each endpoint has a name, a method, a URL, and a set of options.
    // The options are used to define the query parameters, headers, and body of the request.
    endpoints: (builder) => ({}),
});