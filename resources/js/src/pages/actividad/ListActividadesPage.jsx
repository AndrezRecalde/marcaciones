import dayjs from "dayjs";
import { useCallback, useEffect, useMemo } from "react";
import { useMaterialReactTable } from "material-react-table";
import { Box, Button, Container, Grid, LoadingOverlay, Menu, rem } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import {
    BtnSubmit,
    MRTableContent,
    ModalActividad,
    TitlePage,
} from "../../components";
import { useActividadStore, useUiActividad } from "../../hooks";
import { IconDownload, IconEdit, IconSearch } from "@tabler/icons-react";

export const ListActividadesPage = () => {
    const srv_user = JSON.parse(localStorage.getItem("user_srvm"));
    const { modalActionActividad } = useUiActividad();

    const {
        tableLoad,
        loadPDF,
        actividades,
        startLoadActividades,
        startExportPDFActividades,
        startClearActividades,
        setActivateActividad,
    } = useActividadStore();

    const form = useForm({
        initialValues: {
            fecha_inicio: "",
            fecha_fin: "",
        },
        validate: {
            fecha_inicio: isNotEmpty("Por favor ingrese fecha inicio"),
            fecha_fin: isNotEmpty("Por favor ingrese fecha fin"),
        },
    });

    const { fecha_inicio, fecha_fin } = form.values;

    const columns = useMemo(
        () => [
            {
                accessorFn: (row) => row.fecha, //normal accessorKey
                header: "Fecha",
                size: 80,
            },
            {
                accessorKey: "actividad",
                header: "Actividad",
                size: 200,
            },
            {
                accessorKey: "usuario", //normal accessorKey
                header: "Funcionario",
                size: 80,
            },
        ],
        []
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        startLoadActividades(
            srv_user.cdgo_usrio,
            dayjs(fecha_inicio).format("YYYY-MM-DD"),
            dayjs(fecha_fin).format("YYYY-MM-DD")
        );
    };

    const handleEditActividad = useCallback(
        (selected) => {
            setActivateActividad(selected);
            modalActionActividad(1);
        },
        [actividades]
    );

    const handleExportDataPDF = (e) => {
        e.preventDefault();
        const { errors } = form.validate();
        if (
            !errors.hasOwnProperty("fecha_inicio") ||
            !errors.hasOwnProperty("fecha_fin")
        ) {
            startExportPDFActividades(
                srv_user.cdgo_usrio,
                dayjs(fecha_inicio).format("YYYY-MM-DD"),
                dayjs(fecha_fin).format("YYYY-MM-DD")
            );
            /* console.log(
                srv_user.cdgo_usrio,
                fecha_inicio.toLocaleDateString("en-CA"),
                fecha_fin.toLocaleDateString("en-CA")
            ); */
        }
    };

    useEffect(() => {
        return () => {
            startClearActividades();
        };
    }, [fecha_inicio, fecha_fin]);

    const table = useMaterialReactTable({
        columns,
        data: actividades,
        enableRowActions: true,
        renderTopToolbarCustomActions: ({ table }) => (
            <Box>
                <Button
                    //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                    onClick={handleExportDataPDF}
                    leftSection={
                        <IconDownload
                            style={{ width: rem(18), height: rem(18) }}
                        />
                    }
                    color="red.8"
                    size="xs"
                    radius="sm"
                >
                    Exportar PDF
                </Button>
            </Box>
        ),
        renderRowActionMenuItems: ({ closeMenu, row }) => [
            <Menu key={0}>
                <Menu.Item
                    onClick={() => {
                        // View profile logic...
                        closeMenu();
                        handleEditActividad(row.original);
                    }}
                    leftSection={
                        <IconEdit style={{ width: rem(14), height: rem(14) }} />
                    }
                >
                    Editar
                </Menu.Item>
            </Menu>,
        ],
    });

    useEffect(() => {
        return () => {
            startClearActividades();
        };
    }, [fecha_inicio, fecha_fin]);

    return (
        <Container size="md" my="md">
            <TitlePage order={2} size="h2" title="Lista de actividades" />
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
                    <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
                        <DateInput
                            valueFormat="YYYY-MM-DD"
                            label="Fecha inicial"
                            placeholder="Registra la fecha"
                            {...form.getInputProps("fecha_inicio")}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
                        <DateInput
                            valueFormat="YYYY-MM-DD"
                            label="Fecha final"
                            placeholder="Registra la fecha"
                            {...form.getInputProps("fecha_fin")}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                        <BtnSubmit
                            text="Buscar actividades"
                            fullWidth={true}
                            radius="sm"
                            LeftSection={IconSearch}
                        />
                    </Grid.Col>
                </Grid>
            </Box>
            {tableLoad ? <MRTableContent table={table} /> : null}
            <ModalActividad fecha_inicio={fecha_inicio} fecha_fin={fecha_fin} />
        </Container>
    );
};
