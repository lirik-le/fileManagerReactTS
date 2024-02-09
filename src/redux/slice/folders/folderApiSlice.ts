import {apiSlice} from "../apiSlice";

export const folderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addFolder: builder.mutation({
            query: folder => ({
                url: '/drive/folder',
                method: 'POST',
                body: folder,
            }),
        }),
        getFolder: builder.query({
            query: (id) => (`/drive/folder/${id}`),
        }),
    }),
});

export const {
    useAddFolderMutation,
    useGetFolderQuery,
} = folderApiSlice