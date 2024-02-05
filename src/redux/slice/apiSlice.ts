import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://5.35.93.223:7000',
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.token;
        console.log((getState() as RootState), 'fetchBaseQuery token');

        if (token) headers.set('authorization', `Bearer ${token}`);

        return headers;
    }
});

export const apiSlice = createApi({
    baseQuery,
    endpoints: builder => ({})
})