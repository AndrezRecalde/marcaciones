import { createSlice } from "@reduxjs/toolkit";

export const marcacionSlice = createSlice({
    name: "marcacion",
    initialState: {
        isLoading: false,
        loadPDF: false,
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
        onLoadPDF: (state, { payload }) => {
            state.loadPDF = payload;
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
            state.loadPDF = false;
        },
        onErrores: (state, { payload }) => {
            state.errores = payload;
            state.isLoading = false;
            state.loadPDF = false;
            state.marcacion = {};
        },
    },
});

export const {
    onLoading,
    onLoadPDF,
    onLoadMarcacion,
    onLoadMarcaciones,
    //onAddMarcacion,
    //onUpdateMarcacion,
    onClearMarcacion,
    onErrores,
} = marcacionSlice.actions;
