import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    username: string,
    lastName: string,
    email: string,
    password: string
}

const initialState: AuthState = {
    isAuthenticated: false,
    username: "",
    lastName: "",
    email: "",
    password: ""
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.isAuthenticated = false
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(login, (state) => {
                localStorage.setItem('auth', JSON.stringify(state));
            })
            .addCase(logout, () => {
                localStorage.removeItem('auth');
            })
    }
});

export const { login, logout } = authSlice.actions;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export default authSlice.reducer;