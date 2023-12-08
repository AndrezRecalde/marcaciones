import { Box, Container, Grid } from "@mantine/core";
import { TitlePage } from "../../components";

export const JustificacionSearchPage = () => {
    return (
        <Container size="lg" my="md">
            <TitlePage
                order={2}
                size="h2"
                title="Reporte de marcaciones avanzado"
            />
            <Box
                component="form"
                onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
            >

            </Box>
        </Container>
    );
};
