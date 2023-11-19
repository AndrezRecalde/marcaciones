import { IconCalendarCheck, IconDeviceDesktopCog, IconListCheck } from "@tabler/icons-react";

export const lFuncionarios = [
    {
        label: "Marcación",
        icon: IconCalendarCheck,
        initiallyOpened: true,
        links: [
            { label: "Marcación diaria", link: "/marcacion" },
            { label: "Reporte de Marcación", link: "/reporte/marcaciones" },
            { label: "Reporte Administrador", link: "/reporte/marcaciones/admin" },

        ],
    },
    {
        label: "Actividad",
        icon: IconListCheck,
        initiallyOpened: true,
        links: [
            { label: "Registrar Actividad", link: "/actividad" },
            { label: "Ver Actividades", link: "/ver/actividades" },
        ],
    },
    {
        label: "Soporte Técnico",
        icon: IconDeviceDesktopCog,
        initiallyOpened: true,
        links: [
            { label: "Solicitar Soporte", link: "/soporte" },
        ],
    },
];
