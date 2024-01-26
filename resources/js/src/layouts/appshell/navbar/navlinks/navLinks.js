import {
    IconCalendarCheck,
    IconDeviceDesktopCog,
    IconLayersSubtract,
    IconListCheck,
} from "@tabler/icons-react";

export const lFuncionarios = [
    /* {
        label: "Marcación",
        icon: IconCalendarCheck,
        initiallyOpened: true,
        links: [
            { label: "Marcación diaria", link: "/marcacion" },
            { label: "Reporte de Marcación", link: "/reporte/marcaciones" },
        ],
    }, */
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
        links: [{ label: "Solicitar Soporte", link: "/soporte" }],
    },
];

export const lFuncionarioTTHH = [
    {
        label: "Marcación",
        icon: IconCalendarCheck,
        initiallyOpened: true,
        links: [
            { label: "Marcación diaria", link: "/marcacion" },
            { label: "Reporte de Marcación", link: "/reporte/marcaciones" },

        ],
    },
    {
        label: "Administración TTHH",
        icon: IconLayersSubtract,
        initiallyOpened: true,
        links: [
            /* {
                label: "Reporte General",
                link: "/reporte/marcaciones/admin/tthh",
            }, */
            {
                label: "Reporte Administrativo",
                link: "/reporte/avanzado/marcaciones/admin/tthh",
            },
            {
                label: "Registrar justificación",
                link: "/justificaciones/admin/tthh",
            },
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
        links: [{ label: "Solicitar Soporte", link: "/soporte" }],
    },
];
