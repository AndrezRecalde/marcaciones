import { createSlice } from "@reduxjs/toolkit";

export const marcacionSlice = createSlice({
    name: "marcacion",
    initialState: {
        isLoading: false,
        loadPDF: false,
        marcacion: {},
        marcaciones: [],
        storageFields: null,
        tableLoad: false,
        msg: undefined,
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
            state.isLoading = false;
        },
        onLoadMarcaciones: (state, { payload }) => {
            state.marcaciones = payload;
            state.isLoading = false;
            state.tableLoad = true;
        },
        onSavedStorageFields: (state, { payload }) => {
            state.storageFields = payload;
        },
        onLoadMessage: (state, { payload }) => {
            state.msg = payload;
        },
        onClearMarcacion: (state) => {
            state.isLoading = false;
            state.loadPDF = false;
            state.marcacion = {};
            state.marcaciones = [];
            state.storageFields = null;
            state.tableLoad = false;
            state.msg = undefined;
            state.errores = undefined;
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
    onSavedStorageFields,
    onLoadMessage,
    onClearMarcacion,
    onErrores,
} = marcacionSlice.actions;
