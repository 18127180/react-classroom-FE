import React, { createContext, useState } from "react";
import { CircularProgress, Backdrop } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const context = createContext(null);

const BackdropProvider = ({ children }) => {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarType, setsnackbarType] = useState("error");
  const [snackbarMessage, setsnackbarMessage] = useState(" ");
  const [snackbarTime, setsnackbarTime] = useState(3000);
  const handleClose = () => {
    setOpenBackdrop(false);
  };
  const setOpenSnack = (type = "error", message = " ", time = 3000) => {
    setsnackbarType(type);
    setsnackbarMessage(message);
    setsnackbarTime(time);
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <context.Provider value={{ setOpenBackdrop, setOpenSnack }}>
      {children}
      <Backdrop sx={{ color: "#fff", zIndex: 100000 }} open={openBackdrop} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={openSnackbar} autoHideDuration={snackbarTime} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarType} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </context.Provider>
  );
};

BackdropProvider.context = context;

export default BackdropProvider;
