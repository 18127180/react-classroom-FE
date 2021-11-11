import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import theme from "../../theme/theme";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const useStyles = makeStyles({
  grid: {
    display: "flex",
    padding: 20,
    gap: 20,
    width: "100%",
    flexWrap: "wrap",
  },
  root: {
    width: "calc(25% - 15px)",
    minWidth: 250,
    boxSizing: "border-box",
  },
  circularProgress: {
    width: 80,
    height: 80,
    marginLeft: "auto",
    marginRight: "auto",
    display: "inline-block",
    justifyContent: "center",
  },
  createButton: {
    background: "#a1c9f1",
    color: "white",
  },
  media: {
    height: 130,
  },
  description: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    wordBreak: "break-word",
    overflow: "hidden",
    minHeight: 40,
  },
  actions: {
    display: "flex",
    justifyContent: "end",
  },
});

export default function ClassroomList({ classes, loading }) {
  const styles = useStyles();
  const navigate = useNavigate();

  return (
    <Box className={styles.grid}>
      {loading ? (
        <CircularProgress className={styles.circularProgress} />
      ) : (
        classes.map((c, index) => {
          return (
            <Card key={c.id} className={styles.root}>
              <CardMedia
                component="img"
                className={styles.media}
                image={
                  "https://source.unsplash.com/random/?" +
                  (c.section ? c.section : "") +
                  "/" +
                  index
                }
                alt={c.subject}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" noWrap>
                  {c.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className={styles.description}
                >
                  {c.description}
                </Typography>
              </CardContent>
              <CardActions className={styles.actions}>
                <ThemeProvider theme={theme}>
                  {c.student ? (
                    <Tooltip
                      title={`Open your work for ${c.name}`}
                      disableInteractive
                    >
                      <IconButton
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          navigate("/detail-classroom");
                        }}
                      >
                        <WorkOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={`Open gradebook for ${c.name}`}
                      disableInteractive
                    >
                      <IconButton
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          navigate("/detail-classroom");
                        }}
                      >
                        <TrendingUpIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      navigate("/detail-classroom");
                    }}
                  >
                    Access
                  </Button>
                </ThemeProvider>
              </CardActions>
            </Card>
          );
        })
      )}
    </Box>
  );
}
