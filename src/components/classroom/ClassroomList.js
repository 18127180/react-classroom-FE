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
import ClassProvider from "../../contexts/ClassProvider";

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

export default function ClassroomList() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { classState, loading } = React.useContext(ClassProvider.context);
  const [classes, setClasses] = classState;

  return (
    <Box className={styles.grid}>
      {loading ? (
        <CircularProgress className={styles.circularProgress} />
      ) : classes.length === 0 ? (
        <div>
          <img
            src="https://cdn.dribbble.com/users/1507491/screenshots/4945826/media/116a8ebc414c519ad1cfc0fe63f79d3e.jpg?compress=1&resize=800x600&vertical=top"
            style={{ position: "fixed", top: "64px", left: "50%", transform: `translateX(-50%)` }}
            alt="Empty classlist"
          ></img>
        </div>
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
                <Typography variant="body2" color="text.secondary" className={styles.description}>
                  {c.description}
                </Typography>
              </CardContent>
              <CardActions className={styles.actions}>
                <ThemeProvider theme={theme}>
                  {c.student ? (
                    <Tooltip title={`Open your work for ${c.name}`} disableInteractive>
                      <IconButton
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          navigate(`/detail-classroom/${c.id}/grades`);
                        }}
                      >
                        <WorkOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title={`Open gradebook for ${c.name}`} disableInteractive>
                      <IconButton
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          navigate(`/detail-classroom/${c.id}/grades`);
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
                      navigate(`/detail-classroom/${c.id}/stream`);
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
