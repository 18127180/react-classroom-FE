import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { Avatar, Container, TextField, Typography, Button, Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Grid from "@mui/material/Grid";
import { ThemeProvider, createMuiTheme } from "@mui/material/styles";
import axios from "axios";
import React, { useState } from "react";
import theme from "../../../theme/theme";
import { Formik, Form } from "formik";
import * as yup from "yup";
import "../../../styles/assignment.css";
import ReviewComment from "./ReviewComment";
import socket from "../../utils/Socket";
import uuid from "react-native-uuid";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// const socket = io.connect("http://localhost:3001");

const theme1 = createMuiTheme({
  palette: {
    text: {
      disabled: "#757575",
    },
  },
});

const percentColors = [
  { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
  { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
  { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } },
];

const getColorForPercentage = (pct) => {
  for (var i = 1; i < percentColors.length - 1; i++) {
    if (pct < percentColors[i].pct) {
      break;
    }
  }
  var lower = percentColors[i - 1];
  var upper = percentColors[i];
  var range = upper.pct - lower.pct;
  var rangePct = (pct - lower.pct) / range;
  var pctLower = 1 - rangePct;
  var pctUpper = rangePct;
  var color = {
    r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
    g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
    b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
  };
  return "rgb(" + [color.r, color.g, color.b].join(",") + ")";
  // or output as hex if preferred
};

const StudentGrade = ({ data, classId, visitedState, syllabusState, setEffect }) => {
  const [syllabus, setSyllabus] = syllabusState;
  const [visited, setVisited] = visitedState;
  const [expanded, setExpanded] = React.useState(false);
  const access_token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [commenting, setCommenting] = useState(false);
  const [studentTotal, setStudentTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [color, setColor] = useState("red");

  //handle the current accordion
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  React.useEffect(() => {
    console.log("visit", visited[3]);
    if (visited[3] === false) {
      setEffect(false);
      axios
        .get(
          process.env.REACT_APP_API_URL +
            `/classroom/grade-personal?class_id=${classId}&user_id=${user.id}`,
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setSyllabus(res.data);
            const tempVisited = visited;
            tempVisited[3] = true;
            setVisited(tempVisited);
            setEffect(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    let temp1 = 0;
    let temp2 = 0;
    for (let item of syllabus) {
      temp1 += item.grade;
      temp2 += item.maxgrade;
    }
    setStudentTotal(temp1);
    setTotal(temp2);
    setColor(getColorForPercentage(temp1 / temp2));
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        spacing={0}
        direction="column"
        justifyContent="center"
        sx={{
          alignSelf: commenting ? "flex-start" : "center",
          width: commenting ? "calc(100% - 520px)" : "100%",
        }}
      >
        <Container
          sx={{
            maxWidth: "650px !important",
            mt: 2,
            ml: "auto",
            transition: commenting ? "margin-left 1000ms linear" : "",
          }}
        >
          <Grid
            container
            direction="column"
            sx={{
              mt: 4,
              mb: 5,
            }}
          >
            {syllabus.length > 0 && (
              <div
                style={{
                  width: 200,
                  height: 200,
                  textAlign: "center",
                  margin: "auto",
                  alignSelf: "center",
                  marginBottom: "20px",
                }}
              >
                <CircularProgressbar
                  sx={{ margin: "auto" }}
                  value={(studentTotal / total) * 100}
                  text={`${studentTotal}/${total}`}
                  styles={buildStyles({
                    textColor: color,
                    backgroundColor: color,
                    pathColor: color,
                  })}
                />
              </div>
            )}
            {syllabus &&
              syllabus.map((syl, index) => (
                <Accordion
                  // disableGutters={true}
                  sx={{
                    mb: 0.5,
                    borderRadius: "0.5rem",
                    boxShadow:
                      expanded === "panel" + index
                        ? "0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)"
                        : "none",
                    "&:hover": {
                      boxShadow:
                        "0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)",
                    },
                  }}
                  className="assignment"
                  expanded={expanded === "panel" + index}
                  onChange={handleChange("panel" + index)}
                >
                  <AccordionSummary>
                    <Grid container alignItems="center">
                      <Avatar sx={{ backgroundColor: "#ff2c03" }}>
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
                        {syl.syllabus_name}
                      </Typography>
                      <Box sx={{ ml: "auto" }}>
                        <Typography
                          sx={{
                            ml: 2,
                            color: "#ec1212",

                            fontSize: "1.6rem",
                            letterSpacing: ".01785714em",
                          }}
                        >
                          {syl.grade} / {syl.maxgrade}
                        </Typography>
                      </Box>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails sx={{ borderTop: "1px solid #ccc", padding: 0 }}>
                    {syl.review_id ? (
                      <Formik
                        initialValues={{
                          [`expected-${syl.syllabus_id}`]: `${syl.expect_score}`,
                          [`reason-${syl.syllabus_id}`]: `${syl.reason}`,
                        }}
                        validationSchema={yup.object({
                          [`expected-${syl.syllabus_id}`]: yup
                            .number("Enter expected grade")
                            .max(syl.maxgrade)
                            .min(0)
                            .required("Expected grade is required"),
                          [`reason-${syl.syllabus_id}`]: yup
                            .string("Enter reason")
                            .max(255)
                            .required("Reason is required"),
                        })}
                      >
                        {(props) => (
                          <Form onSubmit={props.handleSubmit}>
                            <Grid container direction="column">
                              <Grid
                                item
                                xs={12}
                                sx={{
                                  p: 2,
                                  pl: 4,
                                  letterSpacing: "normal",
                                }}
                              >
                                <ThemeProvider theme={theme1}>
                                  <TextField
                                    id={`expected-${syl.syllabus_id}`}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values[`expected-${syl.syllabus_id}`]}
                                    name={`expected-${syl.syllabus_id}`}
                                    label={`Expected grade for ${syl.syllabus_name}`}
                                    error={
                                      props.touched[`expected-${syl.syllabus_id}`] &&
                                      Boolean(props.errors[`expected-${syl.syllabus_id}`])
                                    }
                                    helperText={
                                      props.touched[`expected-${syl.syllabus_id}`] &&
                                      props.errors[`expected-${syl.syllabus_id}`]
                                    }
                                    defaultValue={syl.grade}
                                    disabled={true}
                                  ></TextField>
                                </ThemeProvider>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sx={{
                                  pb: 2,
                                  pl: 4,
                                  pr: 4,
                                  letterSpacing: "normal",
                                }}
                              >
                                <ThemeProvider theme={theme1}>
                                  <TextField
                                    id={`reason-${syl.syllabus_id}`}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values[`reason-${syl.syllabus_id}`]}
                                    name={`reason-${syl.syllabus_id}`}
                                    label={`Reason for grade composition`}
                                    error={
                                      props.touched[`reason-${syl.syllabus_id}`] &&
                                      Boolean(props.errors[`reason-${syl.syllabus_id}`])
                                    }
                                    helperText={
                                      props.touched[`reason-${syl.syllabus_id}`] &&
                                      props.errors[`reason-${syl.syllabus_id}`]
                                    }
                                    multiline
                                    rows={3}
                                    fullWidth
                                    disabled={true}
                                  ></TextField>
                                </ThemeProvider>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sx={{
                                  pb: 2,
                                  pl: 4,
                                  pr: 4,
                                  fontSize: "13px",
                                  lineHeight: "20px",
                                  letterSpacing: "normal",
                                }}
                              >
                                <ReviewComment
                                  setCommenting={setCommenting}
                                  syllabus={syl}
                                  review_id={syl.review_id}
                                  socket={socket}
                                  data={data}
                                />
                              </Grid>
                            </Grid>
                          </Form>
                        )}
                      </Formik>
                    ) : (
                      <Formik
                        initialValues={{
                          [`expected-${syl.syllabus_id}`]: `${syl.maxgrade}`,
                          [`reason-${syl.syllabus_id}`]: "",
                        }}
                        onSubmit={(values) => {
                          const form = {
                            expect_score: parseInt(values[`expected-${syl.syllabus_id}`], 10),
                            reason: values[`reason-${syl.syllabus_id}`],
                          };
                          axios
                            .post(
                              process.env.REACT_APP_API_URL + `/classroom/add-review`,
                              {
                                syllabus_id: syl.syllabus_id,
                                student_id: user.id,
                                real_score: syl.grade,
                                ...form,
                              },
                              {
                                headers: { Authorization: `Bearer ${access_token}` },
                              }
                            )
                            .then((res) => {
                              console.log(res);
                              let arr = [...syllabus];
                              if (res.status === 200 || res.status === 201) {
                                const notification = {
                                  uuid: uuid.v1(),
                                  sender_name: "Student " + user.last_name + " " + user.first_name,
                                  sender_avatar: user.avatar
                                    ? user.avatar
                                    : "https://cdn-icons-png.flaticon.com/512/194/194931.png",
                                  message:
                                    "Student " +
                                    user.last_name +
                                    " " +
                                    user.first_name +
                                    ` requests a grade review for ${arr[index].syllabus_name} grade`,
                                  has_read: false,
                                  link_navigate: `/detail-classroom/${data.id}/grades`,
                                  time: Date.now(),
                                  class_id: data.id,
                                  to_role_name: "teacher",
                                };
                                socket.emit("send_notification", notification);
                                arr[index].review_id = res.data.id;
                                arr[index].expect_score = res.data.expect_score;
                                arr[index].reason = res.data.reason;
                                console.log(arr[index]);
                                setSyllabus(arr);
                              }
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }}
                        validationSchema={yup.object({
                          [`expected-${syl.syllabus_id}`]: yup
                            .number("Enter expected grade")
                            .max(syl.maxgrade)
                            .min(0)
                            .required("Expected grade is required"),
                          [`reason-${syl.syllabus_id}`]: yup
                            .string("Enter reason")
                            .max(255)
                            .required("Reason is required"),
                        })}
                      >
                        {(props) => (
                          <Form onSubmit={props.handleSubmit}>
                            <Grid container direction="column">
                              <Grid
                                item
                                xs={12}
                                sx={{
                                  p: 2,
                                  pl: 4,
                                  letterSpacing: "normal",
                                }}
                              >
                                <ThemeProvider theme={theme1}>
                                  <TextField
                                    id={`expected-${syl.syllabus_id}`}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values[`expected-${syl.syllabus_id}`]}
                                    name={`expected-${syl.syllabus_id}`}
                                    label={`Expected grade for ${syl.syllabus_name}`}
                                    error={
                                      props.touched[`expected-${syl.syllabus_id}`] &&
                                      Boolean(props.errors[`expected-${syl.syllabus_id}`])
                                    }
                                    helperText={
                                      props.touched[`expected-${syl.syllabus_id}`] &&
                                      props.errors[`expected-${syl.syllabus_id}`]
                                    }
                                    defaultValue={syl.grade}
                                  ></TextField>
                                </ThemeProvider>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sx={{
                                  pb: 2,
                                  pl: 4,
                                  pr: 4,
                                  letterSpacing: "normal",
                                }}
                              >
                                <ThemeProvider theme={theme1}>
                                  <TextField
                                    id={`reason-${syl.syllabus_id}`}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values[`reason-${syl.syllabus_id}`]}
                                    name={`reason-${syl.syllabus_id}`}
                                    label={`Reason for grade composition`}
                                    error={
                                      props.touched[`reason-${syl.syllabus_id}`] &&
                                      Boolean(props.errors[`reason-${syl.syllabus_id}`])
                                    }
                                    helperText={
                                      props.touched[`reason-${syl.syllabus_id}`] &&
                                      props.errors[`reason-${syl.syllabus_id}`]
                                    }
                                    multiline
                                    rows={3}
                                    fullWidth
                                  ></TextField>
                                </ThemeProvider>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sx={{
                                  pb: 2,
                                  pl: 4,
                                  pr: 4,
                                  fontSize: "13px",
                                  lineHeight: "20px",
                                  letterSpacing: "normal",
                                }}
                              >
                                <Button type="submit" variant="contained" sx={{ float: "right" }}>
                                  Submit review
                                </Button>
                              </Grid>
                            </Grid>
                          </Form>
                        )}
                      </Formik>
                    )}
                  </AccordionDetails>
                </Accordion>
              ))}
          </Grid>
        </Container>
      </Grid>
    </ThemeProvider>
  );
};

export default StudentGrade;
