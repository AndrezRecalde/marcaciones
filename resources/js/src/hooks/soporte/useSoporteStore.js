import controlApi from "../../api/controlApi";
import { useDispatch, useSelector } from "react-redux";
import { onErrores, onLoadMessage, onLoading } from "../../store/soporte/soporteSlice";

export const useSoporteStore = () => {
    const { isLoading, msg, errores } = useSelector((state) => state.soporte);
    const dispatch = useDispatch();

    const startSendSoporte = async (
        detalle_incidencia,
        usu_alias,
        email,
        departamento
    ) => {
        try {
            dispatch(onLoading(true));
            const { data } = await controlApi.post("/incidencias/mail", {
                detalle_incidencia,
                usu_alias,
                email,
                departamento,
            });
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            dispatch(onLoading(false));
        } catch (error) {
            dispatch(onLoading(false));
            ExceptionMessageError(error);
        }
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
        msg,
        errores,
        startSendSoporte,
    };
};
