import React from "react";
import Grid from "@mui/material/Grid";
import {
  Button,
  Container,
  Dialog,
  ListItem,
  ListItemText,
  List,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  TextField,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme/theme";
import ControlledEditor from "../ControlledEditor";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import styles from "../../../styles/assignment.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const validationSchema = yup.object({
  title: yup.string("Enter assignment title").required("Assignment title is required"),
  point: yup.number("Assignment point must be integer").required("Assignment point is required"),
});

const AssignmentTab = ({ data, classId }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [assignment, setAssignment] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const access_token = localStorage.getItem("access_token");
  const formik = useFormik({
    initialValues: {
      title: "",
      point: "",
    },
    isInitialValid: false,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const description = value && value !== "<p><br/></p>" ? value : null;
      axios
        .post(
          process.env.REACT_APP_API_URL + "/classroom/assignment",
          {
            classId: classId,
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
          if (res.status === 201) {
            setOpen(false);
            setValue("");
            formik.resetForm();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  React.useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + `/classroom/assignment/${classId}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setAssignment(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
        <Container sx={{ maxWidth: "850px !important", mt: 2 }}>
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
          <Grid container direction="column" sx={{ mt: 4 }}>
            <Grid item>
              {assignment &&
                assignment.map((ass) => (
                  <Accordion
                    disableGutters={true}
                    sx={{
                      boxShadow:
                        "0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)",
                      borderRadius: "0.5rem",
                      "&:not(:hover)": { boxShadow: "none" },
                    }}
                    className="assignment"
                  >
                    <AccordionSummary>
                      <Grid container alignItems="center">
                        <Avatar>
                          <AssignmentOutlinedIcon />
                        </Avatar>
                        <Typography
                          sx={{
                            ml: 2,
                            color: "#3c404a",
                            fontSize: "0.875rem",
                            letterSpacing: ".01785714em",
                          }}
                        >
                          {ass.title}
                        </Typography>
                        <IconButton
                          sx={{ ml: "auto", height: 40, width: 40 }}
                          className="menu-button"
                        >
                          <MoreVertOutlinedIcon />
                        </IconButton>
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails></AccordionDetails>
                  </Accordion>
                ))}
            </Grid>
          </Grid>
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
                    disabled={!formik.isValid}
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
        </Container>
      </Grid>
    </ThemeProvider>
  );
};

export default AssignmentTab;
