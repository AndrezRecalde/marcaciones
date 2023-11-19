import { Alert } from "@mantine/core"

export const StatAlert = ({ text, variant, color, icon:Icon }) => {
  return (
    <Alert variant={variant} color={color} title="Información" icon={<Icon />}>
      {text}
    </Alert>
  )
}
