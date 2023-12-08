import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
    onClearActividades,
    onErrores,
    onLoadActividades,
    onLoadMessage,
    onLoadPDF,
    onSetActivateActividad,
} from "../../store/actividad/actividadSlice";
import controlApi from "../../api/controlApi";

export const useActividadStore = () => {
    const {
        isLoading,
        loadPDF,
        actividades,
        activateActividad,
        tableLoad,
        msg,
        errores,
    } = useSelector((state) => state.actividad);

    const dispatch = useDispatch();

    const startLoadActividades = async (user_id, fecha_inicio, fecha_fin) => {
        try {
            const { data } = await controlApi.post("/get/actividades", {
                user_id,
                fecha_inicio,
                fecha_fin,
            });
            const { actividades } = data;
            dispatch(onLoadActividades(actividades));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAddActividad = async (actividad, fecha_inicio, fecha_fin) => {
        try {
            if (actividad.id) {
                const { data } = await controlApi.put(
                    `/update/actividad/${actividad.id}`,
                    actividad
                );
                dispatch(onLoadMessage(data));
                setTimeout(() => {
                    dispatch(onLoadMessage(undefined));
                }, 40);
                startLoadActividades(
                    actividad.cdgo_usrio,
                    dayjs(fecha_inicio).format("YYYY-MM-DD"),
                    dayjs(fecha_fin).format("YYYY-MM-DD")
                );
                setClearActivateActividad();
                return;
            }
            const { data } = await controlApi.post(
                "/create/actividad",
                actividad
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startExportPDFActividades = async (
        user_id,
        fecha_inicio,
        fecha_fin
    ) => {
        try {
            dispatch(onLoadPDF(true));
            const response = await controlApi.post(
                "/export/pdf/actividades",
                {
                    user_id,
                    fecha_inicio,
                    fecha_fin,
                },
                { responseType: "blob" }
            );
            const url = window.URL.createObjectURL(
                new Blob([response.data], { type: "application/pdf" })
            );
            window.open(url, "_blank");
            dispatch(onLoadPDF(false));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const setActivateActividad = (actividad) => {
        dispatch(onSetActivateActividad(actividad));
    };

    const setClearActivateActividad = () => {
        dispatch(onSetActivateActividad(null));
    };

    const startClearActividades = () => {
        dispatch(onClearActividades());
    };

    const ExceptionMessageError = (error) => {
        const mensaje = error.response.data.msg
            ? error.response.data.msg
            : error.response.data.errores
            ? Object.values(error.response.data.errores)
            : error.response.data.message
            ? error.response.data.message
            : error;
        dispatch(onErrores(mensaje));
        setTimeout(() => {
            dispatch(onErrores(undefined));
        }, 40);
    };

    return {
        isLoading,
        loadPDF,
        actividades,
        activateActividad,
        tableLoad,
        msg,
        errores,

        startAddActividad,
        setActivateActividad,
        setClearActivateActividad,
        startClearActividades,
        startLoadActividades,
        startExportPDFActividades,
    };
};
