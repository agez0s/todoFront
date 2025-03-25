import { Button, ButtonProps, styled } from "@mui/material";

export const TodoButton = styled((props: ButtonProps) => (
  <Button
    size="small"
    variant="contained"
    style={{
      textTransform: "none",
      borderRadius: 12,
      boxShadow: "none",
    }}
    {...props}
  />
))``;
export default TodoButton;
