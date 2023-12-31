import { useEffect } from "react";
import { Card, Container } from "@mantine/core";
import { JustificacionForm, TitlePage } from "../../components";
import { useForm } from "@mantine/form";
import { useTipoPermisoStore } from "../../hooks";
import Swal from "sweetalert2";

export const JustificacionPage = () => {
    const { msg, errores } = useTipoPermisoStore();

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

    useEffect(() => {
        if (msg !== undefined) {
            Swal.fire({
                icon: msg.status,
                text: msg.msg,
                showConfirmButton: true,
            });
            return;
        }
    }, [msg]);

    useEffect(() => {
        if (errores !== undefined) {
            Swal.fire({
                icon: "error",
                title: "Opps..",
                text: errores,
                showConfirmButton: false,
            });
            return;
        }
    }, [errores]);

    return (
        <Container size="sm" my="md">
            <TitlePage order={2} size="h2" title="Permisos o justificaciones" />
            <Card withBorder shadow="sm" radius="md" mt="md">
                <Card.Section withBorder inheritPadding py="xs" pb="md">
                    <JustificacionForm disabled={false} form={form} />
                </Card.Section>
            </Card>
        </Container>
    );
};
