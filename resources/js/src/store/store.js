import { configureStore } from "@reduxjs/toolkit";
import { actividadSlice, authSlice, departamentoSlice, marcacionSlice, soporteSlice, uiActividadSlice, usuarioSlice } from "../store";


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        marcacion: marcacionSlice.reducer,
        actividad: actividadSlice.reducer,
        uiActividad: uiActividadSlice.reducer,
        soporte: soporteSlice.reducer,
        departamento: departamentoSlice.reducer,
        usuario: usuarioSlice.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
});
