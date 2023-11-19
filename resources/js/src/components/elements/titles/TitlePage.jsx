import { Title } from "@mantine/core";

export const TitlePage = ({ order, size, title }) => {
    return (
        <Title order={order} size={size}>
            { title }
        </Title>
    );
};
