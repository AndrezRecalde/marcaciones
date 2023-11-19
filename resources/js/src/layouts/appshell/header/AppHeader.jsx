import { Burger, Group, Image } from "@mantine/core";
import { UserBtnHeader } from "../../../components";

import logo from "../../../assets/images/LogoMediano.png";

export const AppHeader = ({
    mobileOpened,
    toggleMobile,
    desktopOpened,
    toggleDesktop,
}) => {
    return (
        <Group h="100%" px="md" justify="space-between">
            <Group>
                <Image maw={170} radius="md" src={logo} alt="logo_image" />
                <Burger
                    opened={mobileOpened}
                    onClick={toggleMobile}
                    hiddenFrom="sm"
                    size="sm"
                />
                <Burger
                    opened={desktopOpened}
                    onClick={toggleDesktop}
                    visibleFrom="sm"
                    size="sm"
                />
            </Group>

            <UserBtnHeader />
        </Group>
    );
};
