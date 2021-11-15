import { Avatar, Button, Box, Paper, Typography, Chip } from "@mui/material";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import FaceIcon from "@mui/icons-material/Face";
import FaceOutlinedIcon from "@mui/icons-material/FaceOutlined";
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
            Blockchain
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginTop: "10px",
            }}
          >
            <Chip label="1 Teacher" avatar={<FaceIcon />} />
            <Chip label="3 Student" avatar={<FaceOutlinedIcon />} />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "end",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <Button color="error">Cancel</Button>
            <Button variant="contained" color="error">
              Join class
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default InviteTab;
