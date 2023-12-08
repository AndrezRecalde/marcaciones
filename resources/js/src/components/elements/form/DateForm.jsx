import { Grid } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDatesFormContext } from "../../../hooks";

export const DateForm = () => {
    const form = useDatesFormContext();
    return (
        <Grid grow>
            <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
                <DateInput
                    valueFormat="YYYY-MM-DD"
                    label="Fecha"
                    placeholder="Fecha inicial"
                    {...form.getInputProps("fecha_inicio")}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
                <DateInput
                    valueFormat="YYYY-MM-DD"
                    label="Fecha"
                    placeholder="Fecha final"
                    {...form.getInputProps("fecha_fin")}
                />
            </Grid.Col>
        </Grid>
    );
};
