import { useEffect } from "react";
import { Container, SimpleGrid, Text, Title } from "@mantine/core";
import { useDateTime, useMarcacionStore } from "../../hooks";
import {
    Loading,
    MarcacionEntrada,
    MarcacionSalida,
    StatAlert,
} from "../../components";
import {
    IconDoorEnter,
    IconDoorExit,
    IconInfoCircle,
} from "@tabler/icons-react";

import classes from "./MarcacionModule/Marcacion.module.css";

export const MarcacionPage = () => {
    const srv_user = JSON.parse(localStorage.getItem("user_srvm"));
    const {
        isLoading,
        marcacion,
        startLoadMarcacionToday,
        startAddEntrada,
        startClearMarcacion,
        errores,
    } = useMarcacionStore();

    const { currentDate, currentTime } = useDateTime();

    useEffect(() => {
        startLoadMarcacionToday(srv_user.cdgo_usrio);

        return () => {
            startClearMarcacion();
        };
    }, []);

    useEffect(() => {}, [marcacion]);

    const handleBtnMarcacion = () => {
        startAddEntrada(marcacion, srv_user.cdgo_usrio);
    };

    return (
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
                        handleBtnMarcacion={handleBtnMarcacion}
                        btnTitle="Marcar entrada"
                    />

                    <MarcacionSalida
                        icon={IconDoorExit}
                        color="red.8"
                        title="Marcación de salida"
                        reg_salida={
                            marcacion?.reg_salida ? marcacion?.reg_salida : 0
                        }
                        handleBtnMarcacion={handleBtnMarcacion}
                        btnTitle="Marcar salida"
                        currentTime={currentTime}
                    />
                </SimpleGrid>
            )}
            <StatAlert
                text="La marcación de salida se habilitará desde las 12:00:00 P.M"
                title="Marcación de salida"
                variant="outline"
                color="red.7"
                icon={IconInfoCircle}
            />

            <StatAlert
                text="El horario de marcación se rige de: 08:00 A.M (Entrada) hasta las 16:00 P.M (Salida)."
                title="Horarios"
                variant="outline"
                color="indigo.7"
                icon={IconInfoCircle}
            />
        </Container>
    );
};
