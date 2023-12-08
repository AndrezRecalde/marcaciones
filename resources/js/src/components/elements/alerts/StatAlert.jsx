import { Alert, rem } from "@mantine/core";

export const StatAlert = ({ text, title, variant, color, icon: Icon }) => {
    return (
        <Alert
            mb={10}
            variant={variant}
            color={color}
            title={title}
            icon={<Icon />}
            style={{
                padding: rem(20),
                margin: "12px 0px"
            }}
        >
            {text}
        </Alert>
    );
};
