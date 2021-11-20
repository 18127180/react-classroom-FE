import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserBar from "./UserBar";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import Backdrop from "@mui/material/Backdrop";
import { CircularProgress } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const FormTeacherDialog = ({ name, data }) => {
  // const handleCancel = () => {
  //     form.resetFields();
  // };
  const [open, setOpen] = React.useState(false);
  const [emailTextField, setEmailTextField] = React.useState("");
  const [listEmail, setListEmail] = React.useState([]);
  const [count, setCount] = React.useState(1);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [error, setError] = React.useState("");
  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEmailTextField("");
    setListEmail([]);
    setOpen(false);
  };

  const _handleAddEmail = () => {
    if (!validateEmail(emailTextField)) {
      setError("Invalid email. Please try again");
      setOpenError(true);
      return;
    }
    const cloneList = [...listEmail];
    cloneList.push({
      id: count,
      email: emailTextField,
    });
    setListEmail(cloneList);
    setEmailTextField("");
    setCount(count + 1);
  };

  const handleSubmit = () => {
    const access_token = localStorage.getItem("access_token");
    setOpen(false);
    setOpenBackdrop(true);
    axios
      .post(
        process.env.REACT_APP_API_URL + `/classroom/invite_teacher`,
        {
          list_email: listEmail,
          invite_code: data.invitecode,
        },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("user");
          localStorage.removeItem("access_token");
          navigate("/login");
        } else {
          if (res.status === 201) {
            setEmailTextField("");
            setListEmail([]);
            setOpenBackdrop(false);
            setOpenSuccess(true);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        navigate("/login");
      });
  };

  const _handleTextFieldChange = (e) => {
    setEmailTextField(e.target.value);
  };

  return (
    <Box>
      {data.isTeacher ? (
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          onClick={handleClickOpen}
        >
          <PersonAddRoundedIcon style={{ color: "#c26401" }} />
        </IconButton>
      ) : (
        <div></div>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Invite teacher</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              width: 400,
            }}
          >
            <Grid item xs={11}>
              <TextField
                required
                autoFocus
                margin="dense"
                id="name"
                fullWidth
                label="Email Address"
                type="email"
                variant="standard"
                value={emailTextField}
                onChange={_handleTextFieldChange}
              />
            </Grid>

            <Grid item xs={1} mb={1}>
              <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={_handleAddEmail}
                iconStyle={{ width: 2, height: 2 }}
              >
                <AddIcon />
              </IconButton>
            </Grid>
          </Box>
          <Divider />
          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: 300,
              height: 300,
              "& ul": { padding: 0 },
            }}
          >
            <Grid item xs={12}>
              <UserBar list={listEmail} setList={setListEmail} />
            </Grid>
          </List>
          <Divider />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Invite</Button>
        </DialogActions>
      </Dialog>
      {/* display success or fail state */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
        onClick={handleCloseBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: "100%" }}>
          Invite has been sent !!
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={3000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FormTeacherDialog;
