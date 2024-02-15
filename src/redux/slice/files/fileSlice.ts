import { createSlice } from '@reduxjs/toolkit';

interface FolderState {
    file: string
}

const initialState: FolderState = {
    file: ''
};

const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setFile: (state, action) => {
            state.file = action.payload;
        },
    },
});

export const { setFile } = fileSlice.actions;

export default fileSlice.reducer;

