import dayjs from "dayjs";
import { useEffect } from "react";
import { Box, Container, Grid } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { BtnSubmit, TitlePage } from "../../components";
import { useMarcacionStore } from "../../hooks";
import { IconSearch } from "@tabler/icons-react";
import Swal from "sweetalert2";


export const MarcacionImplicit = () => {

    const {
        startAddMarcacionImplicita,
        errores,
        msg,
    } = useMarcacionStore();

    const form = useForm({
        initialValues: {
            fecha: "",
        },
        validate: {
            fecha: isNotEmpty("Por favor ingrese la fecha"),
        },
    });

    const { fecha } = form.values;

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(dayjs(fecha).format("YYYY-MM-DD"));
        startAddMarcacionImplicita(dayjs(fecha).format("YYYY-MM-DD"));
    };

    return (
        <Container size="md" my="md">
            <TitlePage
                order={2}
                size="h2"
                title="Marcación implicita"
            />
            <Box
                component="form"
                onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
            >
                <Grid grow>
                    <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                        <DateInput
                            valueFormat="YYYY-MM-DD"
                            label="Fecha"
                            placeholder="Fecha"
                            {...form.getInputProps("fecha")}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                        <BtnSubmit
                            text="Realizar marcación"
                            fullWidth={true}
                            radius="sm"
                            LeftSection={IconSearch}
                        />
                    </Grid.Col>
                </Grid>
            </Box>
        </Container>
    );
};
