import { AppShell, Button, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AppHeader, AppNavbar } from "../../layouts";
import { IconChevronsLeft } from "@tabler/icons-react";
import classes from "./navbar/NavbarModule/AppNavbar.module.css";
import { useAuthStore } from "../../hooks";

export const AppLayout = ({ children }) => {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
    const { startLogout } = useAuthStore();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 320,
                breakpoint: "sm",
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <AppHeader
                    mobileOpened={mobileOpened}
                    toggleMobile={toggleMobile}
                    desktopOpened={desktopOpened}
                    toggleDesktop={toggleDesktop}
                />
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <AppShell.Section
                    className={classes.links}
                    grow
                    component={ScrollArea}
                >
                    <AppNavbar toggleMobile={toggleMobile} />
                </AppShell.Section>
                <AppShell.Section className={classes.footer}>
                    <Button
                        fullWidth
                        variant="subtle"
                        color="red.7"
                        leftSection={<IconChevronsLeft color="red" size={14} />}
                        rightSection={<span />}
                        justify="space-between"
                        onClick={startLogout}
                    >
                        Cerrar sesión
                    </Button>
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
};
