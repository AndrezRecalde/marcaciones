import { useEffect } from "react";
import { Container, SimpleGrid, Text, Title } from "@mantine/core";
import { useDateTime, useMarcacionStore } from "../../hooks";
import {
    InformationList,
    Loading,
    MarcacionEntrada,
    MarcacionSalida,
    StatAlert,
} from "../../components";
import {
    IconDoorEnter,
    IconDoorExit,
    IconInfoHexagon,
} from "@tabler/icons-react";

import classes from "./MarcacionModule/Marcacion.module.css";
import Swal from "sweetalert2";

export const MarcacionPage = () => {
    const srv_user = JSON.parse(localStorage.getItem("user_srvm"));
    const {
        isLoading,
        marcacion,
        startLoadMarcacionToday,
        startAddEntrada,
        startAddSalida,
        startClearMarcacion,
        errores,
        msg,
    } = useMarcacionStore();

    const { currentDate, currentTime } = useDateTime();

    useEffect(() => {
        startLoadMarcacionToday(srv_user.cdgo_usrio);
        return () => {
            startClearMarcacion();
        };
    }, []);

    useEffect(() => {}, [marcacion]);

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

    const handleBtnMarcacionEntrada = () => {
        startAddEntrada(srv_user.cdgo_usrio);
    };

    const handleBtnMarcacionSalida = () => {
        startAddSalida(srv_user.cdgo_usrio);
    };

    return srv_user.losep !== 1 ? (
        <Container size="sm" my={30}>
            <StatAlert
                text="Según la administración de TTHH a través del MEMORANDO Nº130-GADPE-HAP-GTH-2024
                usted no está obligado a realizar Marcación En-Línea.
                Si usted cree que existe un error, comuniquese lo más pronto posible con TTHH."
                title="Información"
                variant="light"
                color="red.7"
                icon={IconInfoHexagon}
            />
        </Container>
    ) : (
        <Container size="sm" my={30}>
            <Title className={classes.title} ta="center">
                Marcación En-Línea
            </Title>
            <Text c="dimmed" fz="md" ta="center">
                {currentDate}
            </Text>
            <Text c="dimmed" fz="lg" fw={900} ta="center">
                {currentTime}
            </Text>

            {isLoading ? (
                <Loading />
            ) : (
                <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }} my="md">
                    <MarcacionEntrada
                        icon={IconDoorEnter}
                        color="teal.8"
                        title="Marcación de entrada"
                        reg_entrada={
                            marcacion?.reg_entrada ? marcacion?.reg_entrada : 0
                        }
                        handleBtnMarcacion={handleBtnMarcacionEntrada}
                        btnTitle="Marcar entrada"
                    />

                    <MarcacionSalida
                        icon={IconDoorExit}
                        color="red.8"
                        title="Marcación de salida"
                        reg_salida={
                            marcacion?.reg_salida ? marcacion?.reg_salida : 0
                        }
                        handleBtnMarcacion={handleBtnMarcacionSalida}
                        btnTitle="Marcar salida"
                        currentTime={currentTime}
                    />
                </SimpleGrid>
            )}
            <StatAlert
                text={<InformationList />}
                title="Información"
                variant="light"
                color="orange.7"
                icon={IconInfoHexagon}
            />
        </Container>
    );
};
