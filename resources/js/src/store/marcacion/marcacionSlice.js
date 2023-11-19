import { createSlice } from "@reduxjs/toolkit";

export const marcacionSlice = createSlice({
    name: "marcacion",
    initialState: {
        isLoading: false,
        marcacion: {},
        marcaciones: [],
        tableLoad: false,
        msg: null,
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
        },
        onLoadMarcacion: (state, { payload }) => {
            state.marcacion = payload;
            state.msg = undefined;
            state.isLoading = false;
        },
        onLoadMarcaciones: (state, { payload }) => {
            state.marcaciones = payload;
            state.isLoading = false;
            state.tableLoad = true;
        },
        onClearMarcacion: (state) => {
            state.marcacion = {};
            state.marcacion = [];
            state.tableLoad = false;
            state.isLoading = false;
        },
        onErrores: (state, { payload }) => {
            state.errores = payload;
            state.isLoading = false;
            state.marcacion = {};
        },
    },
});

export const {
    onLoading,
    onLoadMarcacion,
    onLoadMarcaciones,
    //onAddMarcacion,
    //onUpdateMarcacion,
    onClearMarcacion,
    onErrores,
} = marcacionSlice.actions;
