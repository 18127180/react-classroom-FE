import React, { useState } from "react";
import { Avatar, Button, Box, Paper, Typography, Chip } from "@mui/material";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import FaceIcon from "@mui/icons-material/Face";
import FaceOutlinedIcon from "@mui/icons-material/FaceOutlined";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import socket from "../utils/Socket";

const InviteTab = () => {
  const { id } = useParams();
  const [loadEffect, setEffect] = useState(false);
  const { search } = useLocation();
  const [data, setData] = useState();
  const navigate = useNavigate();

  const handleJoin = () => {
    const query = new URLSearchParams(search);
    const role_user = query.get("role");
    const user = JSON.parse(localStorage.getItem("user"));
    const access_token = localStorage.getItem("access_token");
    const cjc = query.get("cjc");
    if (role_user === "TEACHER") {
      axios
        .post(
          process.env.REACT_APP_API_URL + `/sendMail/accept-teacher`,
          {
            email: user?.email,
            class_id: id,
          },
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            socket.emit("join_room", "class_" + id);
            navigate(`/detail-classroom/${id}/stream`);
          }
        })
        .catch((err) => {
          if (err.response.status === 404) {
            navigate("/classroom");
          }
          if (err.response.status === 401) {
            localStorage.removeItem("user");
            localStorage.removeItem("access_token");
            setEffect(false);
            navigate("/login");
          }
        });
    }
    if (role_user === "STUDENT" || cjc) {
      axios
        .post(
          process.env.REACT_APP_API_URL + `/sendMail/accept-student`,
          {
            email: user?.email,
            class_id: id,
          },
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            socket.emit("join_room", "class_" + id);
            navigate(`/detail-classroom/${id}/stream`);
          }
        })
        .catch((err) => {
          if (err.response.status === 404) {
            navigate("/classroom");
          }
          if (err.response.status === 401) {
            localStorage.removeItem("user");
            localStorage.removeItem("access_token");
            setEffect(false);
            navigate("/login");
          }
        });
    }
  };

  React.useEffect(() => {
    const query = new URLSearchParams(search);
    const role_user = query.get("role");
    const access_token = localStorage.getItem("access_token");
    const user = JSON.parse(localStorage.getItem("user"));
    const cjc = query.get("cjc");
    if (cjc) {
      axios
        .post(
          process.env.REACT_APP_API_URL + `/classroom/add-queue`,
          {
            email: user?.email,
            class_id: id,
            role: "STUDENT",
          },
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setData(res.data);
            setEffect(true);
          }
        })
        .catch((err) => {
          if (err.response.status === 404) {
            navigate("/detail-classroom/" + id + "/stream");
          }
          if (err.response.status === 401) {
            localStorage.removeItem("user");
            localStorage.removeItem("access_token");
            localStorage.setItem("current_link", "/invite/" + id + "?role=STUDENT");
            setEffect(false);
            navigate("/login");
          }
        });
    } else {
      axios
        .post(
          process.env.REACT_APP_API_URL + `/classroom/invitation`,
          {
            email: user?.email,
            class_id: id,
            role: role_user,
          },
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setData(res.data);
            setEffect(true);
          }
        })
        .catch((err) => {
          if (err.response.status === 404) {
            navigate("/classroom");
          }
          if (err.response.status === 401) {
            localStorage.removeItem("user");
            localStorage.removeItem("access_token");
            localStorage.setItem("current_link", "/invite/" + id + "?role=" + role_user);
            setEffect(false);
            navigate("/login");
          }
        });
    }
  }, []);

  return (
    <div>
      {loadEffect ? (
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
              {data.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                marginTop: "10px",
              }}
            >
              <Chip label={data?.teacherNum + " Teacher"} avatar={<FaceIcon />} />
              <Chip label={data?.studentNum + " Student"} avatar={<FaceOutlinedIcon />} />
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
              <Button
                color="error"
                onClick={() => {
                  navigate("/classroom");
                }}
              >
                Cancel
              </Button>
              <Button variant="contained" color="error" onClick={handleJoin}>
                Join class
              </Button>
            </Box>
          </Paper>
        </Box>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default InviteTab;
