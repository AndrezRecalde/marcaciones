import { useEffect } from "react";
import { Card, Container } from "@mantine/core";
import { ActividadForm, TitlePage } from "../../components";
import { useActividadStore } from "../../hooks";
import Swal from "sweetalert2";

export const ActividadPage = () => {
    const { msg, errores } = useActividadStore();

    useEffect(() => {
        if (msg !== undefined) {
            Swal.fire({
                icon: msg.status,
                text: msg.msg,
                showConfirmButton: false,
                timer: 1500,
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
            <TitlePage order={2} size="h2" title="Registrar actividad" />

            <Card withBorder shadow="sm" radius="md" mt="md">
                <Card.Section withBorder inheritPadding py="xs">
                    <ActividadForm />
                </Card.Section>
            </Card>
        </Container>
    );
};
