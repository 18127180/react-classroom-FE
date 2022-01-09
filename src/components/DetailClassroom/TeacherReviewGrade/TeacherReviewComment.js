import * as React from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import AddCommentOutlined from "@mui/icons-material/AddCommentOutlined";
import { Badge, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState, useRef } from "react";
import { ChatController, MuiChat } from "chat-ui-react";
import "./TeacherReviewComment.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import uuid from "react-native-uuid";

const drawerWidth = 520;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const cssName = {
  position: "absolute",
  top: "-24px",
  fontSize: "12px",
  color: "rgba(0,0,0,0.87)",
  whiteSpace: "nowrap",
};

export default function TeacherReviewComment({
  setCommenting,
  syllabus,
  review_id,
  socket,
  class_id,
}) {
  const theme = useTheme();
  const [state, setState] = useState(false);
  const { syllabus_name, syllabus_id, student_id } = syllabus;
  const [chatCtl] = React.useState(
    new ChatController({
      showDateTime: true,
    })
  );
  const navigate = useNavigate();
  const [commentList, setCommentList] = useState([]);
  let numberOfComment = useRef(0);
  const user = JSON.parse(localStorage.getItem("user"));
  // const [socket, setSocket] = React.useState(null);

  //mock

  async function fetchData(data) {
    try {
      // await chatCtl.addMessage({
      //   type: "text",
      //   content: data.comment,
      //   self: data.is_student,
      // });
      await chatCtl.addMessage({
        type: "text",
        content: (
          <div style={{ position: "relative" }}>
            <p style={{ ...cssName, right: data.user_id === user.id ? "0" : "none" }}>
              {data.name_user}
            </p>
            <span>{data.comment}</span>
          </div>
        ),
        self: data.user_id === user.id,
        avatar: data.avatar
          ? data.avatar
          : data.is_student
          ? "https://cdn-icons-png.flaticon.com/512/194/194931.png"
          : "https://cdn-icons-png.flaticon.com/512/194/194935.png",
        createdAt: new Date(data.created_at),
      });
      numberOfComment.current++;
    } catch (err) {
      console.log(err);
    }
  }

  chatCtl.setActionRequest(
    {
      type: "text",
      always: true,
    },
    (response) => {
      chatCtl.updateMessage(numberOfComment.current, {
        type: "text",
        content: (
          <div style={{ position: "relative" }}>
            <p style={{ ...cssName, right: 0 }}>{user.last_name + " " + user.first_name}</p>
            <span>{response.value}</span>
          </div>
        ),
        self: true,
        avatar: user.avatar ? user.avatar : "https://cdn-icons-png.flaticon.com/512/194/194935.png",
        createdAt: new Date(),
      });
      numberOfComment.current++;
      const messageData = {
        review_id: review_id,
        comment: response.value,
        user_id: user.id,
        name_user: user.last_name + " " + user.first_name,
        avatar: user.avatar ? user.avatar : "https://cdn-icons-png.flaticon.com/512/194/194935.png",
        is_student: false,
      };
      socket.emit("send_comment", messageData);
      const notification = {
        uuid: uuid.v1(),
        sender_name: "Teacher " + user.last_name + " " + user.first_name,
        sender_avatar: user.avatar
          ? user.avatar
          : "https://cdn-icons-png.flaticon.com/512/194/194935.png",
        message:
          "Teacher " +
          user.last_name +
          " " +
          user.first_name +
          ` has replied your ${syllabus_name} grade`,
        has_read: false,
        link_navigate: `/detail-classroom/${class_id}/grades`,
        time: Date.now(),
        class_id: class_id,
        to_user: student_id,
      };
      socket.emit("send_notification_private", notification);
      // fetchData(messageData);
      // const user = JSON.parse(localStorage.getItem("user"));
      // console.log(user);
    }
  );

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    if (open === true) {
      const access_token = localStorage.getItem("access_token");
      axios
        .put(
          process.env.REACT_APP_API_URL + `/classroom/update-comment-status`,
          {
            review_id: review_id,
          },
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            let newCommentList = [...commentList];
            for (let item of newCommentList) {
              item.status = false;
            }
            setCommentList(newCommentList);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setCommenting(open);
    setState(open);
  };

  React.useEffect(() => {
    //generate messages
    socket.on("receive_comment_" + review_id, (data) => {
      console.log(data);
      fetchData(data);
    });
  }, [socket]);

  React.useEffect(() => {
    //generate messages
    socket.emit("join_room", review_id);
    socket.emit("join_room", "class_private_" + student_id);
    const access_token = localStorage.getItem("access_token");
    axios
      .get(process.env.REACT_APP_API_URL + `/classroom/all-comment?review_id=${review_id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setCommentList(res.data);
          numberOfComment.current = res.data.length;
          for (const message of res.data) {
            chatCtl.addMessage({
              type: "text",
              content: (
                <div style={{ position: "relative" }}>
                  <p style={{ ...cssName, right: message.user_id === user.id ? "0" : "none" }}>
                    {message.name_user}
                  </p>
                  <span>{message.comment}</span>
                </div>
              ),
              self: message.user_id == user.id,
              avatar: message.avatar
                ? message.avatar
                : message.is_student
                ? "https://cdn-icons-png.flaticon.com/512/194/194931.png"
                : "https://cdn-icons-png.flaticon.com/512/194/194935.png",
              createdAt: new Date(message.created_at),
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <React.Fragment>
        <Drawer
          id={"comments-" + syllabus_id}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
            height: "100%",
            mt: 0,
          }}
          variant="persistent"
          anchor="right"
          hideBackdrop={true}
          open={state}
          onClose={toggleDrawer(false)}
        >
          <DrawerHeader>
            <Typography sx={{ ml: 1.5 }} variant="h6">
              {syllabus_name}
            </Typography>
            <IconButton onClick={toggleDrawer(false)} sx={{ float: "right", ml: "auto", mr: 2 }}>
              <ChevronRightIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <MuiChat chatController={chatCtl} />
        </Drawer>
        <IconButton
          variant="contained"
          color="default"
          sx={{ float: "left" }}
          onClick={toggleDrawer(true)}
        >
          <Badge
            badgeContent={
              commentList.filter((message) => message.status && message.user_id !== user.id).length
            }
            color="info"
          >
            <AddCommentOutlined />
          </Badge>
        </IconButton>
      </React.Fragment>
    </div>
  );
}
