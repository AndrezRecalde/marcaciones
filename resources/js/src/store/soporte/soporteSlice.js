import { createSlice } from "@reduxjs/toolkit";

export const soporteSlice = createSlice({
    name: "soporte",
    initialState: {
        isLoading: false,
        msg: undefined,
        errores: undefined,
    },
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onLoadMessage: (state, { payload }) => {
            state.msg = payload;
        },
        onErrores: (state, { payload }) => {
            state.isLoading = false;
            state.errores = payload;
        },
    },
});

export const { onLoading, onLoadMessage, onErrores } = soporteSlice.actions;
