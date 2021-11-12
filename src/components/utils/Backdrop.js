import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

/**
 *
 * @param {boolean} state           //open state of simpleBackdrop
 * @param {callback} handleClose    //handle close of simpleBackdrop
 * @returns {ReactJSXElement}
 */
export default function SimpleBackdrop({ state, handleClose }) {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={state}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
