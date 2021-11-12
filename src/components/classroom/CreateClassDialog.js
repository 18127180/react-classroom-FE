import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import config from "../../config.json";
import { ClassContext } from ".";

const validationSchema = yup.object({
  name: yup.string("Enter class name").required("Class name is required"),
  section: yup
    .string("Enter class section")
    .required("Class section is required"),
  topic: yup.string("Enter class topic"),
  description: yup.string("Enter class description"),
});

export default function CreateClassDialog({ open, handleClose }) {
  const [classes, setClasses] = React.useContext(ClassContext);
  const access_token = localStorage.getItem("access_token");
  const formik = useFormik({
    initialValues: {
      name: "",
      section: "",
      topic: "",
      description: "",
    },
    isInitialValid: false,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post(
          config.API_URL + "/classroom",
          {
            name: values.name,
            section: values.section,
            topic: values.topic,
            description: values.description,
          },
          {
            headers: {
              Authorization: "Bearer " + access_token,
            },
          }
        )
        .then((res) => {
          // console.log(res.data);
          setClasses(classes.concat(res.data));
          formik.resetForm();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth="true"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="form-dialog-title">Create class</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              autoFocus
              margin="dense"
              variant="outlined"
              id="name"
              name="name"
              label="Class name (required)"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              autoFocus
              margin="dense"
              variant="outlined"
              id="section"
              name="section"
              label="Section (required)"
              value={formik.values.section}
              onChange={formik.handleChange}
              error={formik.touched.section && Boolean(formik.errors.section)}
              helperText={formik.touched.section && formik.errors.section}
            />
            <TextField
              fullWidth
              autoFocus
              margin="dense"
              variant="outlined"
              id="topic"
              name="topic"
              label="Topic"
              value={formik.values.topic}
              onChange={formik.handleChange}
              error={formik.touched.topic && Boolean(formik.errors.topic)}
              helperText={formik.touched.topic && formik.errors.topic}
            />
            <TextField
              fullWidth
              multiline
              margin="dense"
              variant="outlined"
              id="description"
              name="description"
              label="Class description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.description)}
              helperText={formik.errors.description}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: "#000" }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={!formik.isValid}
              onClick={handleClose}
            >
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
