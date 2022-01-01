import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export default function FormExportDialog({ class_id }) {
  const [open, setOpen] = React.useState(false);
  const access_token = localStorage.getItem("access_token");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const exportStudentList = () => {
    axios({
      url: process.env.REACT_APP_API_URL + "/upload/download/studentlist", //your url
      method: "GET",
      responseType: "blob", // important
      headers: {
        Authorization: "Bearer " + access_token,
      },
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Student List Template.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  };

  const exportGradeList = () => {
    axios({
      url: process.env.REACT_APP_API_URL + "/upload/download/grade-list?class_id=" + class_id, //your url
      method: "GET",
      responseType: "blob", // important
      headers: {
        Authorization: "Bearer " + access_token,
      },
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Grade List Template.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <Box>
      <Tooltip title="Export">
        <IconButton aria-label="export" onClick={handleClickOpen}>
          <FileDownloadIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Choose template for download:"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Button
              variant="contained"
              startIcon={<FileDownloadIcon />}
              sx={{ width: "100%" }}
              onClick={exportStudentList}
            >
              template for student list
            </Button>
            <Button
              variant="contained"
              startIcon={<FileDownloadIcon />}
              sx={{ width: "100%", mt: 2 }}
              onClick={exportGradeList}
            >
              template for scoring student
            </Button>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
