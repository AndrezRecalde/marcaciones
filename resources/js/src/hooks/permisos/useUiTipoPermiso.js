import { useDispatch, useSelector } from "react-redux"
import { onCloseModalTipoPermiso, onOpenModalTipoPermiso } from "../../store/permiso/uiTipoPermisoSlice";

export const useUiTipoPermiso = () => {
   const { isOpenModalTipoPermiso } = useSelector(state => state.uiTipoPermiso);
   const dispatch = useDispatch();

   const modalActionTipoPermiso = (behavior) => {
        if (behavior === 1) {
            dispatch(onOpenModalTipoPermiso());
        } else {
            dispatch(onCloseModalTipoPermiso());
        }
   }

  return {
    isOpenModalTipoPermiso,

    modalActionTipoPermiso
  }
}
