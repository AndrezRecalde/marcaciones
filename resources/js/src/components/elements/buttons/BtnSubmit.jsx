import { Button } from "@mantine/core";

export const BtnSubmit = ({ text, radius, fullWidth = false, LeftSection }) => {
    return (
        <Button mt="md" type="submit" fullWidth={fullWidth} radius={radius} leftSection={<LeftSection />}>
            {text}
        </Button>
    );
};
