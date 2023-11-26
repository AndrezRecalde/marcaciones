import dayjs from "dayjs";
import { useEffect } from "react";
import { Box, Grid, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { BtnSubmit } from "../../components";
import { isNotEmpty, useForm } from "@mantine/form";
import { useActividadStore, useUiActividad } from "../../hooks";
import { IconDatabase } from "@tabler/icons-react";

export const ActividadForm = ({ fecha_inicio, fecha_fin }) => {
    const { activateActividad, startAddActividad } = useActividadStore();
    const { modalActionActividad } = useUiActividad();

    const form = useForm({
        initialValues: {
            actividad: "",
            fecha_actividad: "",
        },

        validate: {
            actividad: isNotEmpty("Por favor ingresa la actividad"),
            fecha_actividad: isNotEmpty(
                "Por favor ingresa la fecha de la actividad"
            ),
        },
    });

    useEffect(() => {
        if (activateActividad !== null) {
            const dt = new Date(activateActividad.fecha_actividad);
            form.setValues({
                ...activateActividad,
                fecha_actividad: dt,
            });
            return;
        }
    }, [activateActividad]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startAddActividad(
            form.values,
            fecha_inicio,
            fecha_fin
        );
        modalActionActividad(0);
        form.reset();
    };
    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Grid>
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                    <DateInput
                        minDate={dayjs(new Date()).add(-5, "days").toDate()}
                        maxDate={dayjs(new Date()).add(1, "month").toDate()}
                        valueFormat="YYYY-MM-DD"
                        label="Fecha de la actividad"
                        placeholder="Registra la fecha"
                        {...form.getInputProps("fecha_actividad")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                    <Textarea
                        label="Actividad"
                        withAsterisk
                        description="Registra la actividad"
                        autosize
                        minRows={6}
                        maxRows={8}
                        {...form.getInputProps("actividad")}
                    />
                </Grid.Col>
            </Grid>
            <BtnSubmit
                radius="md"
                text="Registrar actividad"
                LeftSection={IconDatabase}
                fullWidth={true}
            />
        </Box>
    );
};
