import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
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
  },
};

const StreamTab = ({ data }) => {
  let work = null;

  return (
    <div>
      <Container
        maxWidth="lg"
        sx={{ marginTop: 3.5, maxWidth: "1000px !important" }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper xs={{ padding: 0 }}>
                {/* <CardMedia
                  component="img"
                  sx={{ height: 250, width: "100%" }}
                  image={"https://source.unsplash.com/random/1000x250"}
                  alt={"demo"}
                /> */}
                <Accordion disableGutters>
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
                      {data.section}
                    </Typography>
                    <Typography>
                      <b style={styles.infoLabel}>Topic:</b>
                      {data.topic || ""}
                    </Typography>
                    <Typography>
                      <b style={styles.infoLabel}>Description:</b>
                      {data.description || ""}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Paper>
            </Grid>
            <Grid item xs={3.5}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Item>
                    <Typography xs={{ fontWeight: 500 }}>Upcoming</Typography>
                    {work ? (
                      ""
                    ) : (
                      <Typography xs={{ textAlign: "center" }}>
                        No work due soon
                      </Typography>
                    )}
                  </Item>
                </Grid>
                <Grid item xs={12}>
                  <Item>xs=4</Item>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8.5}>
              <Item>xs=4</Item>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default StreamTab;
