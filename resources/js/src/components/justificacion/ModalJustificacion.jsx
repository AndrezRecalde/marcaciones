import { Modal } from "@mantine/core"
import { JustificacionForm } from "../../components"
import { useUiTipoPermiso, useUsuarioStore } from "../../hooks"
import { useForm } from "@mantine/form";

export const ModalJustificacion = () => {
   const { isOpenModalTipoPermiso, modalActionTipoPermiso } = useUiTipoPermiso();
   const { setActivateUsuario } = useUsuarioStore();

   const form = useForm({
    initialValues: {
        cdgo_dprtmnto: null,
        cdgo_usrio: null,
        fecha_inicio: "",
        hora_inicio: "08:00",
        fecha_fin: "",
        hora_fin: "16:00",
        srv_permiso_id: null,
        detalle: ""
    },
});

   const handleCloseModal = () => {
     modalActionTipoPermiso(0);
     setActivateUsuario(null);
     form.reset();
   }

  return (
    <Modal
        opened={isOpenModalTipoPermiso}
        onClose={handleCloseModal}
        title="Permiso o justificación"
        size="lg"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <JustificacionForm disabled={true} form={form} />
      </Modal>
  )
}
