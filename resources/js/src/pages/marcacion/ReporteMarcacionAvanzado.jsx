import dayjs from "dayjs";
import {
    Box,
    Button,
    CloseButton,
    Combobox,
    Container,
    Grid,
    Group,
    Input,
    InputBase,
    LoadingOverlay,
    ScrollArea,
    Text,
    rem,
    useCombobox,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconDownload, IconSearch } from "@tabler/icons-react";
import { useMaterialReactTable } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import {
    useDepartamentoStore,
    useMarcacionStore,
    useUsuarioStore,
} from "../../hooks";
import { BtnSubmit, MRTableContent, TitlePage } from "../../components";
import { DateInput } from "@mantine/dates";

export const ReporteMarcacionAvanzado = () => {
    const srv_user = JSON.parse(localStorage.getItem("user_srvm"));
    const {
        marcaciones,
        tableLoad,
        loadPDF,
        startLoadMarcacionesAdmin,
        startExportExcelMarcacionesAdmin,
        startClearMarcacion,
    } = useMarcacionStore();
    const { departamentos, startLoadDepartamentos, startClearDepartamentos } =
        useDepartamentoStore();
    const { usuarios, startLoadUsuarios, startClearUsuarios } =
        useUsuarioStore();
    const [searchDepartamento, setSearchDepartamento] = useState("");
    const [searchUser, setSearchUser] = useState("");

    const form = useForm({
        initialValues: {
            fecha_inicio: "",
            fecha_fin: "",
            cdgo_dprtmnto: null,
            cdgo_usrio: null,
        },
        validate: {
            fecha_inicio: isNotEmpty("Por favor ingrese la fecha inicial"),
            fecha_fin: isNotEmpty("Por favor ingrese la fecha final"),
            cdgo_dprtmnto: isNotEmpty("Seleccione el departamento"),
        },
    });

    const { fecha_inicio, fecha_fin, cdgo_usrio, cdgo_dprtmnto } = form.values;

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

    const handleSubmit = (e) => {
        e.preventDefault();
        startLoadMarcacionesAdmin(
            null,
            dayjs(fecha_inicio).format("YYYY-MM-DD"),
            dayjs(fecha_fin).format("YYYY-MM-DD"),
            cdgo_dprtmnto,
            cdgo_usrio
        );
        /* console.log(
            null,
            dayjs(fecha_inicio).format("YYYY-MM-DD"),
            dayjs(fecha_fin).format("YYYY-MM-DD"),
            cdgo_dprtmnto,
            cdgo_usrio
        ); */
    };

    const handleExportData = (e) => {
        e.preventDefault();
        startExportExcelMarcacionesAdmin(
            null,
            dayjs(fecha_inicio).format("YYYY-MM-DD"),
            dayjs(fecha_fin).format("YYYY-MM-DD"),
            cdgo_dprtmnto,
            cdgo_usrio
        );
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
    }, [fecha_inicio, fecha_fin, cdgo_usrio, cdgo_dprtmnto]);

    const comboboxDep = useCombobox({
        onDropdownClose: () => {
            comboboxDep.resetSelectedOption();
            setSearchDepartamento("");
         },
        onDropdownOpen: () => {
            startLoadDepartamentos(srv_user.id_empresa);
        },
    });

    const comboboxUser = useCombobox({
        onDropdownClose: () => {
            comboboxUser.resetSelectedOption();
            setSearchUser("");
         },
        onDropdownOpen: () => {
            startLoadUsuarios(cdgo_dprtmnto);
        },
    });

    function SelectOptionDept({ nmbre_dprtmnto }) {
        return (
            <Group>
                <div>
                    <Text fz="sm" fw={500}>
                        {nmbre_dprtmnto}
                    </Text>
                </div>
            </Group>
        );
    }

    function SelectOptionUser({ nmbre_usrio }) {
        return (
            <Group>
                <div>
                    <Text fz="sm" fw={500}>
                        {nmbre_usrio}
                    </Text>
                </div>
            </Group>
        );
    }

    const selectedOptionD = departamentos.find(
        (item) => item.cdgo_dprtmnto === cdgo_dprtmnto
    );
    const selectedOptionU = usuarios.find(
        (item) => item.cdgo_usrio === cdgo_usrio
    );

    const optionsDep = departamentos
        .filter((departamento) =>
            departamento.nmbre_dprtmnto
                .toLowerCase()
                .includes(searchDepartamento.toLowerCase().trim())
        )
        .map((dep) => (
            <Combobox.Option value={dep.cdgo_dprtmnto} key={dep.cdgo_dprtmnto}>
                <SelectOptionDept {...dep} />
            </Combobox.Option>
        ));

    const optionsUsers = usuarios
        .filter((usuario) =>
            usuario.nmbre_usrio
                .toLowerCase()
                .includes(searchUser.toLowerCase().trim())
        )
        .map((u) => (
            <Combobox.Option value={u.cdgo_usrio} key={u.cdgo_usrio}>
                <SelectOptionUser {...u} />
            </Combobox.Option>
        ));

    return (
        <Container size="md" my="md">
            <TitlePage
                order={2}
                size="h2"
                title="Reporte de marcaciones avanzado"
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
                    <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
                        <Combobox
                            store={comboboxDep}
                            withinPortal={false}
                            onOptionSubmit={(val) => {
                                form.setFieldValue("cdgo_dprtmnto", val);
                                form.setFieldValue("cdgo_usrio", null);
                                comboboxDep.closeDropdown();
                            }}
                        >
                            <Combobox.Target>
                                <InputBase
                                    component="button"
                                    type="button"
                                    pointer
                                    rightSection={
                                        cdgo_dprtmnto !== null ? (
                                            <CloseButton
                                                size="sm"
                                                onMouseDown={(event) =>
                                                    event.preventDefault()
                                                }
                                                onClick={() => {
                                                    form.setFieldValue(
                                                        "cdgo_dprtmnto",
                                                        null
                                                    );
                                                    form.setFieldValue(
                                                        "cdgo_usrio",
                                                        null
                                                    );
                                                }}
                                                aria-label="Clear value"
                                            />
                                        ) : (
                                            <Combobox.Chevron />
                                        )
                                    }
                                    onClick={() => comboboxDep.toggleDropdown()}
                                    rightSectionPointerEvents={
                                        cdgo_dprtmnto === null ? "none" : "all"
                                    }
                                    multiline
                                    {...form.getInputProps("cdgo_dprtmnto")}
                                >
                                    {selectedOptionD ? (
                                        <SelectOptionDept
                                            {...selectedOptionD}
                                        />
                                    ) : (
                                        <Input.Placeholder>
                                            Selecciona el departamento
                                        </Input.Placeholder>
                                    )}
                                </InputBase>
                            </Combobox.Target>

                            <Combobox.Dropdown>
                                <Combobox.Search
                                    value={searchDepartamento}
                                    onChange={(event) =>
                                        setSearchDepartamento(
                                            event.currentTarget.value
                                        )
                                    }
                                    placeholder="Búsqueda de departamento"
                                />
                                <Combobox.Options style={{ overflowY: "auto" }}>
                                    <ScrollArea.Autosize
                                        type="scroll"
                                        mah={200}
                                    >
                                        {optionsDep}
                                    </ScrollArea.Autosize>
                                </Combobox.Options>
                            </Combobox.Dropdown>
                        </Combobox>
                    </Grid.Col>
                    <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
                        <Combobox
                            store={comboboxUser}
                            withinPortal={false}
                            onOptionSubmit={(val, options) => {
                                form.setFieldValue("cdgo_usrio", val);
                                comboboxUser.closeDropdown();
                            }}
                        >
                            <Combobox.Target>
                                <InputBase
                                    component="button"
                                    type="button"
                                    pointer
                                    rightSection={<Combobox.Chevron />}
                                    onClick={() =>
                                        comboboxUser.toggleDropdown()
                                    }
                                    rightSectionPointerEvents="none"
                                    multiline
                                >
                                    {selectedOptionU ? (
                                        <SelectOptionUser
                                            {...selectedOptionU}
                                        />
                                    ) : (
                                        <Input.Placeholder>
                                            Selecciona el funcionario
                                        </Input.Placeholder>
                                    )}
                                </InputBase>
                            </Combobox.Target>

                            <Combobox.Dropdown>
                            <Combobox.Search
                                    value={searchUser}
                                    onChange={(event) =>
                                        setSearchUser(
                                            event.currentTarget.value
                                        )
                                    }
                                    placeholder="Búsqueda de funcionario"
                                />
                                <Combobox.Options>
                                    <ScrollArea.Autosize
                                        type="scroll"
                                        mah={200}
                                    >
                                        {optionsUsers}
                                    </ScrollArea.Autosize>
                                </Combobox.Options>
                            </Combobox.Dropdown>
                        </Combobox>
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
