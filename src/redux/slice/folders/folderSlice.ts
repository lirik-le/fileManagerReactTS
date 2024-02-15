import {createSlice} from '@reduxjs/toolkit';
import {Data} from "../../../types/main";

interface FolderState {
    folder: Data,
    historyFolders: {
        id: string,
        name: string
    }[]
}

const initialState: FolderState = {
    folder: {
        id: 'root',
        name: '',
        children: []
    },
    historyFolders: [{
        id: 'root',
        name: 'Главная'
    }]
};

const folderSlice = createSlice({
    name: 'folder',
    initialState,
    reducers: {
        setFolder: (state, action) => {
            state.folder = action.payload;
        },
        setNewFolder: (state, action) => {
            state.folder.id = action.payload;
        },
        addFolderToHistory: (state, action) => {
            state.historyFolders.push(action.payload);
        },
        deleteFolderFromHistory: (state, action) => {
            const indexToCutFrom = state.historyFolders.findIndex(folder => folder.id === action.payload.id);
            if (indexToCutFrom !== -1) state.historyFolders.splice(indexToCutFrom + 1);
        },
    },
});

export const {setFolder, setNewFolder, addFolderToHistory, deleteFolderFromHistory} = folderSlice.actions;

export default folderSlice.reducer;

