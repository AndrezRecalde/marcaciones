import { Modal } from "@mantine/core";
import { useActividadStore, useUiActividad } from "../../hooks";
import { ActividadForm } from "../../components";

export const ModalActividad = ({ fecha_inicio, fecha_fin }) => {

   const { isOpenModalActividad, modalActionActividad } = useUiActividad();
   const { setClearActivateActividad } = useActividadStore();

   const handleCloseModal = () => {
    setClearActivateActividad();
    modalActionActividad(0);
   }


    return (
        <Modal
            opened={isOpenModalActividad}
            onClose={handleCloseModal}
            title="Actividad"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <ActividadForm fecha_inicio={fecha_inicio} fecha_fin={fecha_fin} />
        </Modal>
    );
};
