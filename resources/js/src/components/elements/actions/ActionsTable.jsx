import { ActionIcon, Box, Group, Menu, rem } from "@mantine/core";
import {
    IconFileTypePdf,
    IconFileTypeXls,
    IconLayersSubtract,
} from "@tabler/icons-react";

export const ActionsReport = ({ handleExportDataXls, handleExportDataPdf }) => (
    <Group>
        <ActionIcon
            size={40}
            variant="filled"
            color="teal.5"
            aria-label="Exportacion excel"
            onClick={handleExportDataXls}
        >
            <IconFileTypeXls
                stroke={2}
                style={{ width: rem(24), height: rem(24) }}
            />
        </ActionIcon>
        <ActionIcon
            size={40}
            variant="filled"
            color="red.7"
            aria-label="Exportacion pdf"
            onClick={handleExportDataPdf}
        >
            <IconFileTypePdf
                stroke={2}
                style={{ width: rem(24), height: rem(24) }}
            />
        </ActionIcon>
    </Group>
);

export const ActionReportPDF = ({ handleExportDataPDF }) => (
    <Box>
        <ActionIcon
            size={40}
            variant="filled"
            color="red.7"
            aria-label="Exportacion pdf"
            onClick={handleExportDataPDF}
        >
            <IconFileTypePdf
                stroke={2}
                style={{ width: rem(24), height: rem(24) }}
            />
        </ActionIcon>
    </Box>
);

export const MenuActionItems = ({ row, closeMenu, handle, text }) => (
    <Menu key={0}>
        <Menu.Item
            onClick={() => {
                closeMenu();
                handle(row.original);
            }}
            leftSection={
                <IconLayersSubtract
                    style={{ width: rem(14), height: rem(14) }}
                />
            }
        >
            {text}
        </Menu.Item>
    </Menu>
);
