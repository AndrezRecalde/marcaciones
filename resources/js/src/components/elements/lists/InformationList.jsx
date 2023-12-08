import { List } from "@mantine/core";

export const InformationList = () => {
    return (
        <List spacing="md" size="sm" withPadding center>
            <List.Item>
                El horario de marcación es: 08:00 A.M (Entrada) hasta 16:00 P.M
                (Salida).
            </List.Item>
            <List.Item>
                La marcación de salida estará habilitada desde las 12:00 P.M.
            </List.Item>
            <List.Item>
                A través del reporte de marcación puedes verificar tus registros
                de entrada, salida y justificaciones asignadas.
            </List.Item>
            {/* <List.Item>
                Los permisos de hasta 4 horas se generan en la Intranet, las
                vacacionales o extensivas se las solicita a través del correo
                institucional al jefe de área.
            </List.Item> */}
        </List>
    );
};
