import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Container, IconButton, Link, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ControlledEditor from "./ControlledEditor";
import UserProvider from "../../contexts/UserProvider";
import GradeTab from "./GradeTab";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/theme";
import GradeStructure from "./StreamTab/GradeStructure";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import BackdropProvider from "../../contexts/BackdropProvider";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  padding: "16px",
  borderRadius: "10px",
}));

const styles = {
  infoLabel: {
    minWidth: 120,
    display: "inline-block",
    fontWeight: 600,
    fontStyle: "normal",
    fontSize: "0.875rem",
  },
  sizeText: {
    fontSize: "0.875rem",
  },
};

const StreamTab = ({ data, classId }) => {
  let work = null;
  const [addPost, setAddPost] = React.useState(false);
  const [user, setUser] = React.useContext(UserProvider.context);
  const [openGrade, setOpenGrade] = React.useState(false);
  const teacher = data.teacherList?.find((t) => t.id === user.id);
  const { setOpenSnack } = React.useContext(BackdropProvider.context);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg" sx={{ marginTop: 11, maxWidth: "1000px !important" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper xs={{ padding: 0, borderRadius: "10px !important" }}>
                  <Accordion disableGutters xs={{ borderRadius: "10px" }}>
                    <AccordionSummary
                      id="panel1a-header"
                      aria-controls="panel1a-content"
                      sx={{
                        height: 250,
                        width: "100%",
                        background: `linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,1)), url('https://picsum.photos/1000/250?random=${data.id}')`,
                        alignItems: "end",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: 36,
                        }}
                      >
                        {data.name}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <b style={styles.infoLabel}>Section:</b>
                        <span style={styles.sizeText}>{data.section}</span>
                      </Typography>
                      <Typography>
                        <b style={styles.infoLabel}>Topic:</b>
                        <span style={styles.sizeText}>{data.topic || ""}</span>
                      </Typography>
                      <Typography>
                        <b style={styles.infoLabel}>Description:</b>
                        <span style={styles.sizeText}>{data.description || ""}</span>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Paper>
              </Grid>
              <Grid item xs={3.5}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    {data && data.isTeacher ? (
                      <Item>
                        <Grid container alignItems={"center"}>
                          <Grid item>
                            <Typography>
                              <span style={styles.infoLabel}>Invite code</span>
                            </Typography>
                          </Grid>
                          <Grid item sx={{ ml: "auto" }}>
                            <IconButton
                              onClick={() => {
                                navigator.clipboard.writeText(data.invitecode);
                                setOpenSnack("info", "Invite code copied to clipboard");
                              }}
                            >
                              <ContentCopyIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                        <Box
                          sx={{
                            paddingTop: 2,
                          }}
                        >
                          <p
                            style={{
                              fontWeight: "bolder",
                              fontSize: "1.5rem",
                              textAlign: "center",
                              color: "red",
                            }}
                          >
                            {data.invitecode}
                          </p>
                        </Box>
                      </Item>
                    ) : (
                      <Item>
                        <Typography>
                          <span style={styles.infoLabel}>Upcoming</span>
                        </Typography>
                        {work ? (
                          ""
                        ) : (
                          <Box sx={{ paddingTop: 2 }}>
                            <p style={styles.sizeText}>No work due soon</p>
                          </Box>
                        )}
                        <Typography>
                          <Link
                            to="#"
                            sx={{
                              textDecoration: "none",
                              "&:hover": {
                                textDecoration: "underline",
                                cursor: "pointer",
                              },
                            }}
                          >
                            <p
                              style={{
                                textAlign: "end",
                                marginBottom: "5px",
                                ...styles.sizeText,
                              }}
                            >
                              View all
                            </p>
                          </Link>
                        </Typography>
                      </Item>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Item>
                      <Typography>
                        <span style={styles.infoLabel}>Grade structure</span>
                      </Typography>
                      <GradeStructure class_id={classId} open={openGrade} />
                      {teacher && <GradeTab data={data} openState={[openGrade, setOpenGrade]} />}
                    </Item>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={8.5}>
                <Item>
                  {addPost ? (
                    <Box>
                      <ControlledEditor />
                      <Grid container justifyContent="end" sx={{ marginTop: 2 }}>
                        <Button
                          sx={{ marginRight: 1 }}
                          color="primary"
                          onClick={() => setAddPost(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => setAddPost(false)}
                        >
                          Post
                        </Button>
                      </Grid>
                    </Box>
                  ) : (
                    <Box
                      onClick={() => setAddPost(true)}
                      sx={{ marginBottom: 1, "&:hover": { cursor: "pointer" } }}
                    >
                      <Grid container alignItems="center">
                        <Avatar height="35" wihth="35"></Avatar>
                        <Link
                          sx={{
                            marginLeft: "10px",
                            color: "rgba(0,0,0,0.55)",
                            textDecoration: "none",
                            "&:hover": {
                              color: "#000",
                              cursor: "pointer",
                            },
                          }}
                        >
                          Annouce something to your class
                        </Link>
                      </Grid>
                    </Box>
                  )}
                </Item>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default StreamTab;
