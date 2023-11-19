import { configureStore } from "@reduxjs/toolkit";
import { actividadSlice, authSlice, marcacionSlice, soporteSlice, uiActividadSlice } from "../store";


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        marcacion: marcacionSlice.reducer,
        actividad: actividadSlice.reducer,
        uiActividad: uiActividadSlice.reducer,
        soporte: soporteSlice.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
});
