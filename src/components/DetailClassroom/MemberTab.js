import React from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import HeaderTopic from "../utils/HeaderTopic";
import FormTeacherDialog from "../utils/FormTeacherDialog";
import FormStudentDialog from "../utils/FormStudentDialog";
import UserBarInClass from "../utils/UserBarInClass";
import { Button, Typography, Snackbar } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import MuiAlert from "@mui/material/Alert";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import axios from "axios";
import theme from "../../theme/theme";
import { ThemeProvider } from "@mui/material/styles";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  padding: "16px",
  borderRadius: "10px",
}));

const MemberTab = ({ data }) => {
  console.log("data", data);
  const inputRef = React.createRef();
  const [open, setOpen] = React.useState(false);
  const [warningMessage, setWarningMessage] = React.useState("");
  const access_token = localStorage.getItem("access_token");

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
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("id", data.id);
    axios
      .post(process.env.REACT_APP_API_URL + "/upload", formdata, {
        // receive two parameter endpoint url ,form data
        headers: {
          Authorization: "Bearer " + access_token,
        },
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
    <Grid container>
      <Grid item xs={9}>
        <Grid container spacing={0} direction="column" alignItems="center">
          <HeaderTopic
            name="Teacher"
            dataClass={data}
            FormDialog={<FormTeacherDialog data={data} />}
          />
          <UserBarInClass list={data.teacherList} />
          <HeaderTopic
            name="Student"
            dataClass={data}
            FormDialog={<FormStudentDialog data={data} />}
          />
          <UserBarInClass list={data.studentList} role="student" />
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <Grid container justifyContent="left">
          <Item sx={{ mt: 3 }}>
            <ThemeProvider theme={theme}>
              <Grid container direction="column" alignItems="center" spacing={1}>
                <Grid item>
                  <Typography>Import student list</Typography>
                </Grid>
                <Grid item sx={{ width: "100%" }}>
                  <Button
                    variant="contained"
                    startIcon={<FileDownloadIcon />}
                    sx={{ width: "100%" }}
                    onClick={(e) => {
                      axios({
                        url: process.env.REACT_APP_API_URL + "/upload/download/studentlist", //your url
                        method: "GET",
                        responseType: "blob", // important
                        headers: {
                          Authorization: `Bearer ${access_token}`,
                        },
                      }).then((response) => {
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement("a");
                        link.href = url;
                        link.setAttribute("download", "Student List Template.xlsx"); //or any other extension
                        document.body.appendChild(link);
                        link.click();
                      });
                    }}
                  >
                    Download template
                  </Button>
                </Grid>
                {data.isTeacher && (
                  <Grid item sx={{ width: "100%" }}>
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
                      sx={{ width: "100%" }}
                    >
                      Upload student list
                    </Button>
                  </Grid>
                )}
              </Grid>
            </ThemeProvider>
          </Item>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          {warningMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default MemberTab;
