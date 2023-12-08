import { createSlice } from "@reduxjs/toolkit";

export const tipoPermisoSlice = createSlice({
    name: "tiposPermisos",
    initialState: {
        tipos: [],
        msg: undefined,
        errores: undefined,
    },
    reducers: {
        onLoadTiposPermisos: (state, { payload }) => {
            state.tipos = payload;
        },
        onClearTiposPermisos: (state) => {
            state.tipos = [];
        },
        onLoadMessage: (state, { payload }) => {
            state.msg = payload;
        },
        onErrores: (state, { payload }) => {
            state.errores = payload;
            //state.tipos = [];
        },
    },
});

export const {
    onLoadTiposPermisos,
    onClearTiposPermisos,
    onLoadMessage,
    onErrores,
} = tipoPermisoSlice.actions;
