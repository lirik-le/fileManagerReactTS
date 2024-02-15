import {apiSlice} from "../apiSlice";

export const fileApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addFile: builder.mutation({
            query: file => ({
                url: '/drive/files',
                method: 'POST',
                body: file,
            }),
        }),
        deleteFile: builder.mutation({
            query: id => ({
                url: `/drive/files/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useAddFileMutation,
    useDeleteFileMutation,
} = fileApiSlice