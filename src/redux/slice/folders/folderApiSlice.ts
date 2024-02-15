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
        renameFolder: builder.mutation({
            query: ({name, id, parentId}) => ({
                url: `/drive/folder/${id}`,
                method: 'PATCH',
                body: {name, parentId},
            }),
        }),
        moveFolder: builder.mutation({
            query: ({id, parentId}) => ({
                url: `/drive/folder/${id}`,
                method: 'PATCH',
                body: {parentId},
            }),
        }),
        deleteFolder: builder.mutation({
            query: id => ({
                url: `/drive/folder/${id}`,
                method: 'DELETE',
            }),
        }),
        getFolder: builder.query({
            query: (id) => (`/drive/folder/${id}`),
        }),
    }),
});

export const {
    useAddFolderMutation,
    useRenameFolderMutation,
    useMoveFolderMutation,
    useDeleteFolderMutation,
    useGetFolderQuery,
} = folderApiSlice