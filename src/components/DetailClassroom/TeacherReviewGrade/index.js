import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { Avatar, Container, TextField, Typography, Button, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Grid from "@mui/material/Grid";
import { createMuiTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import "../../../styles/assignment.css";
import TeacherReviewComment from "./TeacherReviewComment";
import socket from "../../utils/Socket";
import moment from "moment-timezone";
import uuid from "react-native-uuid";
// const socket = io.connect("http://localhost:3001");

const TeacherReviewGrade = ({ data }) => {
  const [syllabus, setSyllabus] = React.useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [commenting, setCommenting] = useState(false);
  const access_token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user"));

  // console.log(moment.tz.names());
  //handle the current accordion
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSubmitButton = (index) => {
    let arr = [...syllabus];
    if (!arr[index].final_mark) {
      const notification = {
        uuid: uuid.v1(),
        sender_name: "Teacher " + user.last_name + " " + user.first_name,
        sender_avatar: user.avatar
          ? user.avatar
          : "https://cdn-icons-png.flaticon.com/512/194/194935.png",
        message:
          "Teacher " +
          user.last_name +
          " " +
          user.first_name +
          ` has marked final score in your review for ${arr[index].syllabus_name} grade`,
        has_read: false,
        link_navigate: `/detail-classroom/${data.id}/grades`,
        time: Date.now(),
        class_id: data.id,
        to_user: arr[index].student_id,
      };
      socket.emit("send_notification_private", notification);
    }
    arr[index].final_mark = !syllabus[index].final_mark;
    setSyllabus(arr);
  };

  const theme = createMuiTheme({
    palette: {
      text: {
        disabled: "#757575",
      },
    },
  });

  React.useEffect(() => {
    // setSyllabus([
    //     {
    //       syllabus_id: 123,
    //       syllabus_name: "Mid term",
    //       order: 0,
    //       maxGrade: 100,
    //       grade: 13,
    //     },
    //     {
    //       syllabus_id: 456,
    //       syllabus_name: "Seminar",
    //       order: 1,
    //       maxGrade: 120,
    //       grade: 75,
    //     }
    //   ]);
    axios
      .get(process.env.REACT_APP_API_URL + `/classroom/all-review?class_id=${data.id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setSyllabus(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
            }}
          >
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
                    <Grid container>
                      <Grid container sx={{ justifyContent: "space-between", display: "flex" }}>
                        <Box></Box>
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              fontSize: "13px",
                              letterSpacing: ".01785714em",
                              ml: 2,
                              mb: -1,
                              color: "#898989",
                            }}
                          >
                            {moment
                              .tz(syl.created_at, "Asia/Saigon")
                              .format("HH:mm:ss DD/MM/YYYY ")}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid container alignItems="center">
                        <Avatar sx={{ backgroundColor: "#ff2c03" }}>
                          <AssignmentOutlinedIcon />
                        </Avatar>
                        {syl.final_mark && (
                          <CheckCircleIcon
                            color="success"
                            sx={{
                              position: "absolute",
                              top: expanded === "panel" + index ? "20px" : "10px",
                              left: "40px",
                              zIndex: 1000,
                              transition: "top linear 0s",
                            }}
                          />
                        )}
                        <Typography
                          sx={{
                            ml: 2,
                            color: "#3c404a",
                            fontSize: "0.875rem",
                            fontWeight: "bold",
                            letterSpacing: ".01785714em",
                          }}
                        >
                          {syl.syllabus_name} - {syl.student_code}
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
                            {syl.real_score} / {syl.maxgrade}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails sx={{ borderTop: "1px solid #ccc", padding: 0 }}>
                    <Formik
                      initialValues={{
                        [`expected-${syl.syllabus_id}`]: `${syl.grade}`,
                        [`reason-${syl.syllabus_id}`]: `${syl.reason}`,
                        [`final-${syl.syllabus_id}`]: `${
                          syl.final_mark ? syl.final_score : syl.maxgrade
                        }`,
                      }}
                      onSubmit={(values) => {
                        const form = {
                          expect_score: parseInt(values[`expected-${syl.syllabus_id}`], 10),
                          reason: values[`reason-${syl.syllabus_id}`],
                          final_score: parseInt(values[`final-${syl.syllabus_id}`], 10),
                        };
                        axios
                          .put(
                            process.env.REACT_APP_API_URL + `/classroom/update-review`,
                            {
                              syllabus_id: syl.syllabus_id,
                              student_id: syl.student_id,
                              ...form,
                            },
                            {
                              headers: { Authorization: `Bearer ${access_token}` },
                            }
                          )
                          .then((res) => {
                            if (res.status === 200 || res.status === 201) {
                              console.log(res.data);
                            }
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                      validationSchema={yup.object({
                        [`expected-${syl.syllabus_id}`]: yup
                          .number("Enter expected grade")
                          .max(syl.grade)
                          .min(0)
                          .required("Final grade is required"),
                        [`reason-${syl.syllabus_id}`]: yup
                          .string("Enter reason")
                          .max(255)
                          .required("Reason is required"),
                        [`final-${syl.syllabus_id}`]: yup
                          .number("Enter final grade")
                          .max(syl.maxgrade)
                          .min(0)
                          .required("Final grade is required"),
                      })}
                    >
                      {(props) => (
                        <Form onSubmit={props.handleSubmit}>
                          <Grid container direction="column">
                            <Grid
                              container
                              style={{ display: "flex", justifyContent: "space-between" }}
                            >
                              <Box
                                item
                                xs={12}
                                sx={{
                                  p: 2,
                                  pl: 4,
                                  letterSpacing: "normal",
                                }}
                              >
                                <TextField
                                  id={`expected-${syl.syllabus_id}`}
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
                              </Box>

                              <Box
                                item
                                xs={12}
                                sx={{
                                  p: 2,
                                  pl: 4,
                                  letterSpacing: "normal",
                                }}
                              >
                                <TextField
                                  id={`final-${syl.syllabus_id}`}
                                  onChange={props.handleChange}
                                  onBlur={props.handleBlur}
                                  value={props.values[`final-${syl.syllabus_id}`]}
                                  name={`final-${syl.syllabus_id}`}
                                  label={`Final score for ${syl.syllabus_name}`}
                                  error={
                                    props.touched[`final-${syl.syllabus_id}`] &&
                                    Boolean(props.errors[`final-${syl.syllabus_id}`])
                                  }
                                  helperText={
                                    props.touched[`final-${syl.syllabus_id}`] &&
                                    props.errors[`final-${syl.syllabus_id}`]
                                  }
                                  defaultValue={syl.grade}
                                  disabled={syl.final_mark ? true : false}
                                ></TextField>
                              </Box>
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
                              <ThemeProvider theme={theme}>
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
                                  disabled={true}
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
                              <TeacherReviewComment
                                setCommenting={setCommenting}
                                syllabus={syl}
                                socket={socket}
                                review_id={syl.id}
                                class_id={data.id}
                              />
                              {!syl.final_mark ? (
                                <Button
                                  onClick={(e) => handleSubmitButton(index)}
                                  variant="contained"
                                  sx={{ float: "right" }}
                                >
                                  Confirm
                                </Button>
                              ) : (
                                <Button
                                  type="submit"
                                  onClick={(e) => handleSubmitButton(index)}
                                  variant="contained"
                                  color="error"
                                  sx={{ float: "right" }}
                                >
                                  Cancel
                                </Button>
                              )}
                            </Grid>
                          </Grid>
                        </Form>
                      )}
                    </Formik>
                  </AccordionDetails>
                </Accordion>
              ))}
          </Grid>
        </Container>
      </Grid>
    </ThemeProvider>
  );
};

export default TeacherReviewGrade;
