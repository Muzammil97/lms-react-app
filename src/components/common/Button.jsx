import { Button as MuiButton } from "@mui/material";

const Button = ({ label, onClick, color = "primary" }) => {
  return <MuiButton variant="contained" color={color} onClick={onClick}>{label}</MuiButton>;
};

export default Button;
