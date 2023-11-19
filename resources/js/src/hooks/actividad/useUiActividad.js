import { useDispatch, useSelector } from "react-redux";
import { onCloseModalActividad, onOpenModalActividad } from "../../store/actividad/uiActividadSlice";

export const useUiActividad = () => {
    const { isOpenModalActividad } = useSelector((state) => state.uiActividad);
    const dispatch = useDispatch();

    const modalActionActividad = (behavior) => {
        if (behavior === 1) {
            dispatch(onOpenModalActividad());
        } else {
            dispatch(onCloseModalActividad());
        }
    };

    return {
        isOpenModalActividad,

        modalActionActividad
    };
};
