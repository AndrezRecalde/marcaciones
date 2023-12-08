import { useEffect } from "react";
import { Card, Container } from "@mantine/core";
import { SoporteForm, StatAlert, TitlePage } from "../../components";
import { IconInfoCircle } from "@tabler/icons-react";
import { useSoporteStore } from "../../hooks";
import Swal from "sweetalert2";

export const SoportePage = () => {
    const { msg, errores } = useSoporteStore();

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
                text: errores,
                showConfirmButton: false,
            });
            return;
        }
    }, [errores]);

    return (
        <Container size="sm" my="md">
            <TitlePage order={2} size="h2" title="Solicitar soporte técnico" />

            <Card withBorder shadow="sm" radius="md" mt="md">
                <Card.Section withBorder inheritPadding py="xs">
                    <SoporteForm />
                </Card.Section>
                <Card.Section withBorder inheritPadding py="xs">
                    <StatAlert
                        text="Un administrador de la Gestión de TICs analizará tu solicitud para resolver tu incidencia."
                        variant="default"
                        color="teal.7"
                        icon={IconInfoCircle}
                    />
                </Card.Section>
            </Card>
        </Container>
    );
};
