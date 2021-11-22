import React from "react";
import Grid from "@mui/material/Grid";
import {
  Button,
  Container,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import ControlledEditor from "../ControlledEditor";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const validationSchema = yup.object({
  title: yup.string("Enter assignment title").required("Assignment title is required"),
  point: yup.number("Assignment point must be integer").required("Assignment point is required"),
});

const CreateAssignment = ({ classId, openState, assignmentState, curAssignmentState }) => {
  const [open, setOpen] = openState;
  const [assignment, setAssignment] = assignmentState;
  const [curAssignment, setCurAssignment] = curAssignmentState;
  const [value, setValue] = React.useState("");
  const access_token = localStorage.getItem("access_token");

  React.useEffect(() => {
    if (curAssignment) {
      setValue(curAssignment.description);
    } else {
      setValue("");
    }
  }, [curAssignment]);

  //handle the add assignment dialog
  const handleClickOpen = () => {
    setCurAssignment(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      title: curAssignment ? curAssignment.title : "",
      point: curAssignment ? curAssignment.point : "",
    },
    enableReinitialize: true,
    initialErrors: {
      title: "Can't leave blank title",
      point: "Can't leave blank point",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const description = value && value !== "<p><br/></p>" ? value : null;
      if (curAssignment) {
        axios
          .put(
            process.env.REACT_APP_API_URL + "/classroom/assignment",
            {
              classId: classId,
              assignmentId: curAssignment.id,
              title: values.title,
              description: description,
              point: values.point,
            },
            {
              headers: {
                Authorization: "Bearer " + access_token,
              },
            }
          )
          .then((res) => {
            // console.log(res.data);
            if (res.status === 200) {
              const idx = assignment.findIndex((obj) => obj.id === res.data.id);
              setAssignment((prev) => [...prev.slice(0, idx), res.data, ...prev.slice(idx + 1)]);
              setOpen(false);
              setValue("");
              formik.resetForm();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .post(
            process.env.REACT_APP_API_URL + "/classroom/assignment",
            {
              classId: classId,
              title: values.title,
              description: description,
              point: values.point,
              count: assignment.length,
            },
            {
              headers: {
                Authorization: "Bearer " + access_token,
              },
            }
          )
          .then((res) => {
            // console.log(res.data);
            if (res.status === 201) {
              setAssignment(assignment.concat(res.data));
              setOpen(false);
              setValue("");
              formik.resetForm();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  });

  return (
    <React.Fragment>
      <Button
        variant="contained"
        size="large"
        startIcon={<AddIcon />}
        sx={{
          borderRadius: "25px",
          textTransform: "none",
          fontWeight: 500,
          height: "50px",
        }}
        onClick={handleClickOpen}
      >
        Create
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <form onSubmit={formik.handleSubmit}>
          <AppBar sx={{ position: "relative" }} color="secondary">
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Assignment
              </Typography>
              <Button
                autoFocus
                variant="contained"
                color="primary"
                type="submit"
                disabled={curAssignment ? false : !formik.isValid}
              >
                Assign
              </Button>
            </Toolbar>
          </AppBar>

          <Container maxWidth="sm" sx={{ mt: 3 }}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <AssignmentOutlinedIcon sx={{ mt: 1.6 }} />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      fullWidth
                      autoFocus
                      margin="dense"
                      variant="filled"
                      id="title"
                      name="title"
                      label="Title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      error={formik.touched.title && Boolean(formik.errors.title)}
                      helperText={formik.touched.title && formik.errors.title}
                    ></TextField>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <DescriptionOutlinedIcon sx={{ mt: 1.6 }} />
                  </Grid>
                  <Grid item xs={11}>
                    <ControlledEditor value={value} setValue={setValue} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <BorderColorOutlinedIcon sx={{ mt: 1.6 }} />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      fullWidth
                      lmargin="dense"
                      variant="filled"
                      id="point"
                      name="point"
                      label="Point"
                      type="number"
                      value={formik.values.point}
                      onChange={formik.handleChange}
                      error={formik.touched.point && Boolean(formik.errors.point)}
                      helperText={formik.touched.point && formik.errors.point}
                    ></TextField>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default CreateAssignment;
