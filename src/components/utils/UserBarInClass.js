import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";

const UserBarInClass = ({ list, role }) => {
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
      {role === "student" && itemList.length === 0 ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src="https://cdn.dribbble.com/users/1507491/screenshots/4945826/media/116a8ebc414c519ad1cfc0fe63f79d3e.jpg?compress=1&resize=800x600&vertical=top"
            height={200}
            width={250}
          ></img>
        </div>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <List dense={false}>{itemList}</List>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default UserBarInClass;
