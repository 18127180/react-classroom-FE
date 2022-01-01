import { useState, Fragment, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LockIcon from "@mui/icons-material/Lock";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Box } from "@mui/material";
import BackdropProvider from "../../contexts/BackdropProvider";

const validationSchema = yup.object({
  "current-password": yup.string("Enter current password").required("Current password is required"),
  "new-password-1": yup
    .string("Enter your new password")
    .min(6, "Password must have at least 6 characters")
    .max(255)
    .required("New password is required"),
  "new-password-2": yup
    .string("Re-enter new password")
    .min(6, "Password must have at least 6 characters")
    .max(255)
    .required("New password is required")
    .oneOf([yup.ref("new-password-1"), null], "Passwords must match"),
});

export default function ChangePassword() {
  const [open, setOpen] = useState(false);
  const { setOpenBackdrop, setOpenSnack } = useContext(BackdropProvider.context);
  const access_token = localStorage.getItem("access_token");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      "current-password": "",
      "new-password-1": "",
      "new-password-2": "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setOpenBackdrop(true);
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/user/change-password`,
          {
            "current-password": values["current-password"],
            "new-password": values["new-password-1"],
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then((res) => {
          setOpenBackdrop(false);
          if (res.status === 200) {
            setOpenSnack("success", "Password changed", 3000);
            console.log(res);
          }
        })
        .catch((err) => {
          setOpenBackdrop(false);
          setOpenSnack("error", "Error", 3000);
          console.log(err);
        });
    },
  });

  return (
    <Fragment>
      <Button
        variant="contained"
        fullWidth
        color="info"
        onClick={handleClickOpen}
        startIcon={<LockIcon />}
      >
        Change password
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <DialogTitle>Change password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To in order to change your password, please type your old password once and the
              alternative password twice.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="current-password"
              id="current-password"
              label="Current password"
              type="password"
              fullWidth
              variant="filled"
              value={formik.values["current-password"]}
              onChange={formik.handleChange}
              error={
                formik.touched["current-password"] && Boolean(formik.errors["current-password"])
              }
              helperText={formik.touched["current-password"] && formik.errors["current-password"]}
            />
            <TextField
              autoFocus
              margin="dense"
              name="new-password-1"
              id="new-password-1"
              label="New password"
              type="password"
              fullWidth
              variant="filled"
              value={formik.values["new-password-1"]}
              onChange={formik.handleChange}
              error={formik.touched["new-password-1"] && Boolean(formik.errors["new-password-1"])}
              helperText={formik.touched["new-password-1"] && formik.errors["new-password-1"]}
            />
            <TextField
              autoFocus
              margin="dense"
              name="new-password-2"
              id="new-password-2"
              label="Retype new password"
              type="password"
              fullWidth
              variant="filled"
              value={formik.values["new-password-2"]}
              onChange={formik.handleChange}
              error={formik.touched["new-password-2"] && Boolean(formik.errors["new-password-2"])}
              helperText={formik.touched["new-password-2"] && formik.errors["new-password-2"]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Fragment>
  );
}
