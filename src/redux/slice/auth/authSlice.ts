import { createSlice } from '@reduxjs/toolkit';


interface AuthState {
    token: string | null;
}

const initialState: AuthState = {
    token: ''
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        logOut: (state) => {
            state.token = '';
        },
    },
});

export const { setToken, logOut } = authSlice.actions;

export default authSlice.reducer;

