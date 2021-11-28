import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";

const UserBarInClass = ({ list }) => {
  const iterator = list ? list : [];
  const itemList = iterator.map((item) => (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={item.avatar}></Avatar>
      </ListItemAvatar>
      {item.student_id ? (
        <React.Fragment>
          <ListItemText
            primary={item.first_name + " " + item.last_name}
            sx={{
              width: "100%",
              maxWidth: "100%",
              textOverflow: "ellipsis",
              lineClamp: 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              display: "-webkit-box",
              boxOrient: "vertical",
            }}
          />
          <ListItemText primary={item.student_id} />
        </React.Fragment>
      ) : (
        <ListItemText primary={item.first_name + " " + item.last_name} />
      )}
    </ListItem>
  ));

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        width: "80%",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <List dense={false}>{itemList}</List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserBarInClass;
