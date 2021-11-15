import { Avatar, Button, Box, Paper, Typography } from "@mui/material";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import React from "react";

const InviteTab = () => {
  return (
    <div>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage:
            "url(https://previews.123rf.com/images/gonin/gonin1507/gonin150700073/42848307-abstract-blue-white-geometrical-web-background.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Paper
          sx={{
            marginBottom: "100px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          elevation={6}
        >
          <Avatar sx={{ m: 1, bgcolor: "error.main" }}>
            <AddReactionIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Do you really want to join Blockchain ?
          </Typography>
          <Button variant="contained" color="error">
            Accept
          </Button>
        </Paper>
      </Box>
    </div>
  );
};

export default InviteTab;
