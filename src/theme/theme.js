import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#ec1212",
      darker: "#053e85",
    },
    secondary: {
      main: "#ffffff",
      contrastText: "#000",
    },
  },
});

export default theme;
