import React from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import { Button, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const HeaderTopic = ({ name, FormDialog }) => {
  const inputRef = React.createRef();
  const [open, setOpen] = React.useState(false);
  const [warningMessage, setWarningMessage] = React.useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onChangeHandler = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file.name.split(".")[1] !== "xlsx") {
      setWarningMessage("Can only import .xlsx file !!!");
      setOpen(true);
      return;
    }
    const data = new FormData();
    data.append("file", file);
    axios
      .post("http://localhost:4000/upload", data, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        if (res.statusText === "OK") {
          // xu ly
        }
      })
      .catch((err) => {
        setWarningMessage("Something's wrong !!!");
        setOpen(true);
      });
  };

  const onClickHandler = () => {
    inputRef.current.click();
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        mt: 2,
        width: "60%",
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid",
        borderBottomColor: "#c26401",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          fontWeight: "medium",
          fontSize: 30,
          color: "#c26401",
        }}
      >
        {name}
      </Box>
      <Box sx={{ ml: "auto", mr: 1 }}>
        {name === "Student" && (
          <React.Fragment>
            <input
              type="file"
              hidden
              name="file"
              ref={inputRef}
              onChange={onChangeHandler}
              onClick={(e) => (e.target.value = null)}
            ></input>
            <Button
              variant="contained"
              onClick={onClickHandler}
              color="primary"
              startIcon={<DocumentScannerIcon />}
              sx={{ textTransform: "none" }}
            >
              Upload class list
            </Button>
          </React.Fragment>
        )}
      </Box>
      <Box>{FormDialog}</Box>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          {warningMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HeaderTopic;
