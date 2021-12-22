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
import React from "react";
import theme from "../../../theme/theme";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
// import CreateAssignment from "./CreateAssignment";
import "../../../styles/assignment.css";

const StudentGrade = ({ data, visitedState, setEffect }) => {
  const [open, setOpen] = React.useState(false);
  const [syllabus, setSyllabus] = React.useState(null);
  const [visited, setVisited] = visitedState;
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const access_token = localStorage.getItem("access_token");

  //handle the current accordion
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  console.log(data);

  React.useEffect(() => {
    console.log("visit", visited[3]);
    if (visited[3] === false) {
      //mock
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
      ]);
      const tempVisited = visited;
      tempVisited[3] = true;
      setVisited(tempVisited);
      setEffect(true);
      // setEffect(false);
      //   axios
      //     .get(process.env.REACT_APP_API_URL + `/classroom/assignment/${classId}`, {
      //       headers: { Authorization: `Bearer ${access_token}` },
      //     })
      //     .then((res) => {
      //       if (res.status === 200) {
      //         setAssignment(res.data);
      //         const tempVisited = visited;
      //         tempVisited[1] = true;
      //         setVisited(tempVisited);
      //         setEffect(true);
      //       }
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
        <Container sx={{ maxWidth: "650px !important", mt: 2 }}>
          {/* {data.isTeacher && (
            <CreateAssignment
              openState={[open, setOpen]}
              classId={classId}
              assignmentState={[assignment, setAssignment]}
              curAssignmentState={[curAssignment, setCurAssignment]}
            />
          )} */}
          <Grid container direction="column" sx={{ mt: 4 }}>
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
                          {syl.grade} / {syl.maxGrade}
                        </Typography>
                      </Box>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails sx={{ borderTop: "1px solid #ccc", padding: 0 }}>
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
                          label={`Expected grade for ${syl.syllabus_name}`}
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
                          label={`Reason for grade composition`}
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
                        <IconButton variant="contained" color="default" sx={{ float: "left" }}>
                          <Badge badgeContent={4} color="info">
                            <AddCommentOutlinedIcon />
                          </Badge>
                        </IconButton>
                        <Button variant="contained" sx={{ float: "right" }}>
                          Submit review
                        </Button>
                      </Grid>
                    </Grid>
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
