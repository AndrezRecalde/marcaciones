import { Box, Button, Container, Grid, LoadingOverlay, rem } from "@mantine/core";
import { useMaterialReactTable } from "material-react-table";
import { BtnSubmit, MRTableContent, TitlePage } from "../../components";
import { DateInput } from "@mantine/dates";
import { IconDownload, IconSearch } from "@tabler/icons-react";
import { useMarcacionStore } from "../../hooks";
import { useEffect, useMemo } from "react";
import { isNotEmpty, useForm } from "@mantine/form";

export const ReporteMarcacionAdminPage = () => {
    const {
        startLoadMarcacionesAdmin,
        marcaciones,
        tableLoad,
        loadPDF,
        startExportExcelMarcacionesAdmin,
        startClearMarcacion,
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

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(fecha.toLocaleDateString("en-CA"));
        startLoadMarcacionesAdmin(fecha.toLocaleDateString("en-CA"));
    };

    const columns = useMemo(
        () => [
            {
                accessorFn: (row) => row.current_fecha, //normal accessorKey
                header: "Fecha",
                size: 80,
            },
            {
                accessorKey: "reg_entrada", //normal accessorKey
                header: "Hora de Entrada",
                size: 80,
            },
            {
                accessorKey: "reg_salida",
                header: "Hora de Salida",
                size: 80,
            },
            {
                accessorKey: "usuario",
                header: "Empleado",
                size: 80,
            },
            {
                accessorKey: "departamento",
                header: "Departamento",
                size: 80,
            },
        ],
        []
    );

    const handleExportData = (e) => {
        e.preventDefault();
        startExportExcelMarcacionesAdmin(fecha.toLocaleDateString("en-CA"));
    };

    const table = useMaterialReactTable({
        columns,
        data: marcaciones,
        renderTopToolbarCustomActions: ({ table }) => (
            <Box>
                <Button
                    //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                    onClick={handleExportData}
                    leftSection={
                        <IconDownload
                            style={{ width: rem(18), height: rem(18) }}
                        />
                    }
                    color="green.8"
                    size="xs"
                    radius="sm"
                >
                    Exportar Excel
                </Button>
            </Box>
        ),
    });

    useEffect(() => {
        return () => {
            startClearMarcacion();
        };
    }, [fecha]);

    return (
        <Container size="md" my="md">
            <TitlePage
                order={2}
                size="h2"
                title="Reporte de marcaciones de Empleados"
            />
            <Box
                component="form"
                onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
            >
                <LoadingOverlay
                    visible={loadPDF}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 2 }}
                />

                <Grid grow>
                    <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                        <DateInput
                            valueFormat="YYYY-MM-DD"
                            label="Fecha"
                            placeholder="Fecha de búsqueda"
                            {...form.getInputProps("fecha")}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                        <BtnSubmit
                            text="Revisar marcaciones"
                            fullWidth={true}
                            radius="sm"
                            LeftSection={IconSearch}
                        />
                    </Grid.Col>
                </Grid>
            </Box>
            {tableLoad ? <MRTableContent table={table} /> : null}
        </Container>
    );
};
