import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Container, Link, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ControlledEditor from "./ControlledEditor";
import theme from "../../theme/theme";
import { ThemeProvider } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  padding: "16px",
  borderRadius: "10px",
}));

const styles = {
  paperContainer: {
    height: 250,
    width: "100%",
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,1)), url('https://source.unsplash.com/random/1000x250')",
    alignItems: "end",
  },
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

const StreamTab = ({ data }) => {
  let work = null;
  const [addPost, setAddPost] = React.useState(false);

  return (
    <div>
      <Container
        maxWidth="lg"
        sx={{ marginTop: 11, maxWidth: "1000px !important" }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper xs={{ padding: 0, borderRadius: "10px !important" }}>
                <Accordion disableGutters xs={{ borderRadius: "10px" }}>
                  <AccordionSummary
                    id="panel1a-header"
                    aria-controls="panel1a-content"
                    sx={styles.paperContainer}
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
                      <span style={styles.sizeText}>
                        {data.description || ""}
                      </span>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Paper>
            </Grid>
            <Grid item xs={3.5}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
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
                </Grid>
                {/* <Grid item xs={12}>
                  <Item>xs=4</Item>
                </Grid> */}
              </Grid>
            </Grid>
            <Grid item xs={8.5}>
              <Item>
                {addPost ? (
                  <Box>
                    <ControlledEditor />
                    <Grid container justifyContent="end" sx={{ marginTop: 2 }}>
                      <ThemeProvider theme={theme}>
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
                      </ThemeProvider>
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
    </div>
  );
};

export default StreamTab;
