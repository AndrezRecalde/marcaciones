import { useDispatch, useSelector } from "react-redux";
import {
    onClearTiposPermisos,
    onErrores,
    onLoadMessage,
    onLoadTiposPermisos,
} from "../../store/permiso/tipoPermisoSlice";
import controlApi from "../../api/controlApi";

export const useTipoPermisoStore = () => {
    const { tipos, msg, errores } = useSelector((state) => state.tipoPermiso);
    const dispatch = useDispatch();

    const startLoadTiposPermisos = async () => {
        try {
            const { data } = await controlApi.get("/tipos/permisos");
            const { tipos } = data;
            dispatch(onLoadTiposPermisos(tipos));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAddJustificacion = async (
        fecha_inicio,
        hora_inicio,
        fecha_fin,
        hora_fin,
        cdgo_usrio,
        srv_permiso_id,
        detalle
    ) => {
        try {
            const { data } = await controlApi.post("/justificacion", {
                fecha_inicio,
                hora_inicio,
                fecha_fin,
                hora_fin,
                cdgo_usrio,
                srv_permiso_id,
                detalle,
            });
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startClearTiposPermisos = () => {
        dispatch(onClearTiposPermisos());
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
        tipos,
        msg,
        errores,

        startLoadTiposPermisos,
        startAddJustificacion,
        startClearTiposPermisos,
    };
};
