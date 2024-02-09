import {apiSlice} from "../apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginQ: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: {...credentials},
            }),
        }),
        registerQ: builder.mutation({
            query: credentials => ({
                url: '/auth/register',
                method: 'POST',
                body: {...credentials},
            }),
        }),
    }),
});

export const {
    useLoginQMutation,
    useRegisterQMutation,
} = authApiSlice