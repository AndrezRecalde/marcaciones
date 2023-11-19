import { Card, Container } from "@mantine/core";
import { SoporteForm, StatAlert, TitlePage } from "../../components";
import { IconInfoCircle } from "@tabler/icons-react";

export const SoportePage = () => {
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
