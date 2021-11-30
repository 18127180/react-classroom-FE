import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import axios from "axios";

const GradeStructure = ({ class_id, open }) => {
  const [list, setList] = React.useState([]);
  React.useEffect(() => {
    if (open === false) {
      const access_token = localStorage.getItem("access_token");
      axios
        .get(process.env.REACT_APP_API_URL + "/classroom/grade-structure?class_id=" + class_id, {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        })
        .then((res) => {
          // console.log("res", res);
          setList(res.data.list_syllabus);
        })
        .catch((err) => console.log(err));
    }
  }, [open]);
  return (
    <div>
      {list.length > 0 ? (
        <Grid container direction="column" sx={{ mt: 1 }}>
          {list.map((l) => (
            <Grid
              item
              sx={{
                padding: 0.75,
                "&:first-of-type": {
                  borderTopLeftRadius: "5px",
                  borderTopRightRadius: "5px",
                },
                "&:last-of-type": {
                  borderBottomLeftRadius: "5px",
                  borderBottomRightRadius: "5px",
                },
                "&:nth-of-type(odd)": {
                  background: "#ededed",
                },
              }}
            >
              <Grid container alignItems="center">
                <Grid item xs={10}>
                  <Typography>{l.subject_name}</Typography>
                </Grid>
                <Grid item xs={2} sx={{ textAlign: "right" }}>
                  <Typography>{l.grade}</Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ paddingTop: 2 }}>
          <p style={{ fontSize: "0.875rem" }}>No work due soon</p>
        </Box>
      )}
    </div>
  );
};

export default React.memo(GradeStructure);
