import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Avatar, Container, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Grid from "@mui/material/Grid";
import { ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import React from "react";
import theme from "../../../theme/theme";
import CreateAssignment from "./CreateAssignment";
import "../../../styles/assignment.css";

const AssignmentTab = ({ data, classId }) => {
  const [open, setOpen] = React.useState(false);
  const [assignment, setAssignment] = React.useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [curMenu, setCurMenu] = React.useState(null);
  const [curAssignment, setCurAssignment] = React.useState(null);
  const access_token = localStorage.getItem("access_token");

  //handle the menu item]
  const handleClickMenu = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setCurMenu(Number(event.currentTarget.getAttribute("data-id")));
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    setCurAssignment(assignment.find((ass) => ass.id === curMenu));
    setOpen(true);
    setAnchorEl(null);
  };
  const handleRemove = () => {
    axios
      .delete(
        process.env.REACT_APP_API_URL + `/classroom/class/${classId}/assignment/${curMenu}`,
        // {
        //   classId: classId,
        //   assignmentId: curMenu,
        // },
        {
          headers: { Authorization: "Bearer " + access_token },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setAssignment(assignment.filter((ass) => ass.id !== curMenu));
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setAnchorEl(null);
  };

  //handle the current accordion
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
  }, [access_token, classId]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
        <Container sx={{ maxWidth: "850px !important", mt: 2 }}>
          <CreateAssignment
            openState={[open, setOpen]}
            classId={classId}
            assignmentState={[assignment, setAssignment]}
            curAssignmentState={[curAssignment, setCurAssignment]}
          />
          <Grid container direction="column" sx={{ mt: 4 }}>
            <Grid item>
              {assignment &&
                assignment.map((ass, index) => (
                  <Accordion
                    // disableGutters={true}
                    key={ass.id}
                    sx={{
                      mb: 0.5,
                      boxShadow:
                        "0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)",
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
                          {ass.title}
                        </Typography>
                        <IconButton
                          sx={{ ml: "auto", height: 40, width: 40 }}
                          className="menu-button"
                          data-id={ass.id}
                          onClick={handleClickMenu}
                        >
                          <MoreVertOutlinedIcon />
                        </IconButton>
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails sx={{ borderTop: "1px solid #ccc", padding: 0 }}>
                      <Grid container direction="row">
                        <Grid
                          item
                          xs={8}
                          sx={{
                            p: 2,
                            pl: 4,
                            fontSize: "13px",
                            lineHeight: "20px",
                            letterSpacing: "normal",
                            borderRight: "1px solid #ccc",
                          }}
                          dangerouslySetInnerHTML={{ __html: ass.description }}
                        ></Grid>
                        <Grid item xs={4}></Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </Grid>
          </Grid>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            sx={{ right: 20 }}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleRemove}>Remove</MenuItem>
          </Menu>
        </Container>
      </Grid>
    </ThemeProvider>
  );
};

export default AssignmentTab;