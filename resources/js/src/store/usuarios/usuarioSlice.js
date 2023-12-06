import { createSlice } from "@reduxjs/toolkit";

export const usuarioSlice = createSlice({
    name: "usuario",
    initialState: {
        usuarios: [],
        activateUsuario: null
    },
    reducers: {
        onLoadUsuarios: (state, { payload }) => {
            state.usuarios = payload;
        },
        onSetActivateUsuario: (state, { payload }) => {
            state.activateUsuario = payload;
        },
        onClearUsuarios: (state) => {
            state.usuarios = [];
        }
    },
});

export const {
    onLoadUsuarios,
    onSetActivateUsuario,
    onClearUsuarios
} = usuarioSlice.actions;
