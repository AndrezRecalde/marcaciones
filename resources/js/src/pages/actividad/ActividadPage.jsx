import {  Card, Container } from "@mantine/core";
import { ActividadForm, TitlePage } from "../../components";


export const ActividadPage = () => {

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
