import { createSlice } from "@reduxjs/toolkit";

export const usuarioSlice = createSlice({
    name: "usuario",
    initialState: {
        usuarios: [],
    },
    reducers: {
        onLoadUsuarios: (state, { payload }) => {
            state.usuarios = payload;
        },
        onClearUsuarios: (state) => {
            state.usuarios = [];
        }
    },
});

export const {
    onLoadUsuarios,
    onClearUsuarios
} = usuarioSlice.actions;
