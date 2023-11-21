import { Box, Grid, LoadingOverlay, Textarea } from "@mantine/core";
import { BtnSubmit } from "../../components";
import { IconBrandTelegram } from "@tabler/icons-react";
import { isNotEmpty, useForm } from "@mantine/form";
import { useSoporteStore } from "../../hooks";

export const SoporteForm = () => {
    const srv_user = JSON.parse(localStorage.getItem("user_srvm"));
    const { isLoading, startSendSoporte } = useSoporteStore();

    const form = useForm({
        initialValues: {
            detalle_incidencia: "",
        },
        validate: {
            detalle_incidencia: isNotEmpty("Por favor ingresa la incidencia"),
        },
    });

    const { detalle_incidencia } = form.values;

    const handleSubmit = (e) => {
        e.preventDefault();
        startSendSoporte(detalle_incidencia, srv_user.usu_alias, srv_user.email, srv_user.departamento);
        form.reset();
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Grid>
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                    <Textarea
                        label="Incidencia"
                        withAsterisk
                        description="Detalla la incidencia"
                        autosize
                        minRows={6}
                        maxRows={8}
                        {...form.getInputProps("detalle_incidencia")}
                    />
                </Grid.Col>
            </Grid>
            <BtnSubmit
                radius="md"
                text="Enviar incidencia"
                LeftSection={IconBrandTelegram}
                fullWidth={true}
            />
        </Box>
    );
};
