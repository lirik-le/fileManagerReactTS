import { createSlice } from '@reduxjs/toolkit';

interface FolderState {
    folder: {
        id: string,
        name: string
        children: []
    }
}

const initialState: FolderState = {
    folder: {
        id: '',
        name: '',
        children: []
    }
};

const folderSlice = createSlice({
    name: 'folder',
    initialState,
    reducers: {
        setFolder: (state, action) => {
            state.folder = action.payload;
        },
    },
});

export const { setFolder } = folderSlice.actions;

export default folderSlice.reducer;

