import React, { createContext, useState } from "react";
import { CircularProgress, Backdrop } from "@mui/material";
const context = createContext(null);

const BackdropProvider = ({ children }) => {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const handleClose = () => {
    setOpenBackdrop(false);
  };
  return (
    <context.Provider value={[openBackdrop, setOpenBackdrop]}>
      {children}
      <Backdrop sx={{ color: "#fff", zIndex: 100000 }} open={openBackdrop} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </context.Provider>
  );
};

BackdropProvider.context = context;

export default BackdropProvider;
