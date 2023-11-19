import cx from "clsx";
import { useState } from "react";
import {
    Avatar,
    Group,
    Menu,
    Text,
    UnstyledButton,
    rem,
    useMantineTheme,
} from "@mantine/core";
import {
    IconChevronRight,
    IconLogout,
    IconMail,
    IconUserHexagon,
} from "@tabler/icons-react";

import classes from "./UserModule/UserHeader.module.css";
import { useAuthStore } from "../../hooks";


export const UserBtnHeader = () => {
    const srv_user = JSON.parse(localStorage.getItem("user_srvm"));
    const theme = useMantineTheme();
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const { startLogout } = useAuthStore();

    return (
        <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: "slide-left" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
        >
            <Menu.Target>
                <UnstyledButton
                    className={cx(classes.user, {
                        [classes.userActive]: userMenuOpened,
                    })}
                >
                    <Group gap={7}>
                        <Avatar
                            alt="avatar_u"
                            radius="xl"
                            size={25}
                        />
                        <div style={{ flex: 1 }}>
                            <Text fw={500} size="sm">
                                {srv_user.usu_alias}
                            </Text>
                            <Text size="xs" c="dimmed">
                                {srv_user.email}
                            </Text>
                        </div>
                        <IconChevronRight
                            style={{ width: rem(12), height: rem(12) }}
                            stroke={1.5}
                        />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    component="a"
                    href="http://186.46.193.22:8080/intranet/principal.jsp"
                    target="_blank"
                    leftSection={
                        <IconUserHexagon
                            style={{ width: rem(16), height: rem(16) }}
                            color={theme.colors.indigo[6]}
                            stroke={1.5}
                        />
                    }
                >
                    Intranet
                </Menu.Item>
                <Menu.Item
                    component="a"
                    href="https://www.gadpe.gob.ec/webmail"
                    target="_blank"
                    leftSection={
                        <IconMail
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                        />
                    }
                >
                    Correo Institucional
                </Menu.Item>
                <Menu.Label>Settings</Menu.Label>
                <Menu.Item
                    onClick={startLogout}
                    color="red"
                    leftSection={
                        <IconLogout
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                        />
                    }
                >
                    Cerrar sesión
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};
