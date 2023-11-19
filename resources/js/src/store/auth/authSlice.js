import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoading: false,
        user: {},
        errores: undefined
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
        },
        onAuthenticate: (state, { payload }) => {
            state.user = payload;
            state.isLoading = false;
        },
        onLogout: (state, { payload }) => {
            state.isLoading = false;
            state.user = {};
            state.errores = payload;
        },
        onClearErrores: (state) => {
            state.errores = undefined;
        },
    },
});

export const {
    onLoading,
    onAuthenticate,
    onLogout,
    onClearErrores
} = authSlice.actions;
