import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import {
  Avatar,
  Container,
  TextField,
  Menu,
  MenuItem,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Grid from "@mui/material/Grid";
import { ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import React, { useState } from "react";
import theme from "../../../theme/theme";
import { Formik, Form } from "formik";
import * as yup from "yup";
import "../../../styles/assignment.css";
import TeacherReviewComment from "./TeacherReviewComment";

const StudentGrade = ({ data }) => {
  const [syllabus, setSyllabus] = React.useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [commenting, setCommenting] = useState(false);

  //handle the current accordion
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  React.useEffect(() => {
    setSyllabus([
        {
          syllabus_id: 123,
          syllabus_name: "Mid term",
          order: 0,
          maxGrade: 100,
          grade: 13,
        },
        {
          syllabus_id: 456,
          syllabus_name: "Seminar",
          order: 1,
          maxGrade: 120,
          grade: 75,
        },
        {
          syllabus_id: 789,
          syllabus_name: "Final term",
          order: 2,
          maxGrade: 100,
          grade: 99,
        },
        {
            syllabus_id: 789,
            syllabus_name: "Final term",
            order: 2,
            maxGrade: 100,
            grade: 99,
          },
          {
            syllabus_id: 789,
            syllabus_name: "Final term",
            order: 2,
            maxGrade: 100,
            grade: 99,
          },
          {
            syllabus_id: 789,
            syllabus_name: "Final term",
            order: 2,
            maxGrade: 100,
            grade: 99,
          },
          {
            syllabus_id: 789,
            syllabus_name: "Final term",
            order: 2,
            maxGrade: 100,
            grade: 99,
          },
          {
            syllabus_id: 789,
            syllabus_name: "Final term",
            order: 2,
            maxGrade: 100,
            grade: 99,
          },
          {
            syllabus_id: 789,
            syllabus_name: "Final term",
            order: 2,
            maxGrade: 100,
            grade: 99,
          },
          {
            syllabus_id: 789,
            syllabus_name: "Final term",
            order: 2,
            maxGrade: 100,
            grade: 99,
          },
          {
            syllabus_id: 789,
            syllabus_name: "Final term",
            order: 2,
            maxGrade: 100,
            grade: 99,
          },
          {
            syllabus_id: 789,
            syllabus_name: "Final term",
            order: 2,
            maxGrade: 100,
            grade: 99,
          },
          {
            syllabus_id: 789,
            syllabus_name: "Final term",
            order: 2,
            maxGrade: 100,
            grade: 99,
          },
          {
            syllabus_id: 789,
            syllabus_name: "Final term",
            order: 2,
            maxGrade: 100,
            grade: 99,
          },
          {
            syllabus_id: 789,
            syllabus_name: "Final term",
            order: 2,
            maxGrade: 100,
            grade: 99,
          },
          {
            syllabus_id: 789,
            syllabus_name: "Final term",
            order: 2,
            maxGrade: 100,
            grade: 99,
          },
      ]);
    // if (visited[3] === false) {
    //   setEffect(false);
    //   const tempVisited = visited;
    //   tempVisited[3] = true;
    //   setVisited(tempVisited);
    //   setEffect(true);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
        <Container
          sx={{
            maxWidth: "650px !important",
            mt: 2,
            ml: commenting ? "50px" : "auto",
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
                    boxShadow: "0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)",
                    borderRadius: "0.5rem",
                    "&:not(:hover)": { boxShadow: "none" },
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
                        // axios
                        //   .post(
                        //     process.env.REACT_APP_API_URL + `/classroom/add-review`,
                        //     {
                        //       syllabus_id: syl.syllabus_id,
                        //       student_code: syl.student_code,
                        //       ...form,
                        //     },
                        //     {
                        //       headers: { Authorization: `Bearer ${access_token}` },
                        //     }
                        //   )
                        //   .then((res) => {
                        //     if (res.status === 200 || res.status === 201) {
                        //       console.log(res.data);
                        //     }
                        //   })
                        //   .catch((err) => {
                        //     console.log(err);
                        //   });
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
                              <TeacherReviewComment setCommenting={setCommenting} syllabus={syl} />
                              <Button type="submit" variant="contained" sx={{ float: "right" }}>
                                Submit review
                              </Button>
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

export default StudentGrade;