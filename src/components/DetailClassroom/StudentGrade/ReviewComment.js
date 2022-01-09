import * as React from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import AddCommentOutlined from "@mui/icons-material/AddCommentOutlined";
import { Badge, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState, useRef } from "react";
import { ChatController, MuiChat } from "chat-ui-react";
import "./ReviewComment.css";
import axios from "axios";
import uuid from "react-native-uuid";

const drawerWidth = 520;
const cssName = {
  position: "absolute",
  top: "-24px",
  fontSize: "12px",
  color: "rgba(0,0,0,0.87)",
  whiteSpace: "nowrap",
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function ReviewComment({ setCommenting, syllabus, review_id, socket, data }) {
  const [state, setState] = useState(false);
  const { syllabus_name, syllabus_id } = syllabus;
  let numberOfComment = useRef(0);
  const [commentList, setCommentList] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [chatCtl] = React.useState(
    new ChatController({
      showDateTime: true,
    })
  );

  //mock
  const mock = [
    {
      id: 1,
      syllabus_id: 4,
      username: "Narui",
      content: "Mong thay xem xet",
      isStudent: true,
      avatar:
        "https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.18169-1/cp0/p86x86/15542053_340996142952805_2049033225934452726_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=dbb9e7&_nc_ohc=En4rN_34GnkAX-jGALs&_nc_ht=scontent.fsgn5-9.fna&oh=00_AT8kCLkgpwGvyvrxXRLdmHrvjF6KZX1MRcRn68I11c-kYA&oe=61F480E5",
      isSeen: false,
      createdAt: new Date(),
    },
    {
      id: 2,
      syllabus_id: 4,
      content: "Toi ko thich day",
      username: "Phuc Le",
      isStudent: false,
      avatar:
        "https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.18169-1/cp0/p86x86/15542053_340996142952805_2049033225934452726_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=dbb9e7&_nc_ohc=En4rN_34GnkAX-jGALs&_nc_ht=scontent.fsgn5-9.fna&oh=00_AT8kCLkgpwGvyvrxXRLdmHrvjF6KZX1MRcRn68I11c-kYA&oe=61F480E5",
      isSeen: false,
      createdAt: new Date(),
    },
  ];

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
        avatar: user.avatar ? user.avatar : "https://cdn-icons-png.flaticon.com/512/194/194931.png",
        createdAt: new Date(),
      });
      const messageData = {
        review_id: review_id,
        comment: response.value,
        user_id: user.id,
        name_user: user.last_name + " " + user.first_name,
        avatar: user.avatar ? user.avatar : "https://cdn-icons-png.flaticon.com/512/194/194931.png",
        is_student: true,
      };
      numberOfComment.current++;
      socket.emit("send_comment", messageData);
      const notification = {
        uuid: uuid.v1(),
        sender_name: "Student " + user.last_name + " " + user.first_name,
        sender_avatar: user.avatar
          ? user.avatar
          : "https://cdn-icons-png.flaticon.com/512/194/194931.png",
        message:
          "Student " +
          user.last_name +
          " " +
          user.first_name +
          ` has replied your ${syllabus_name} grade`,
        has_read: false,
        link_navigate: `/detail-classroom/${data.id}/grades`,
        time: Date.now(),
        class_id: data.id,
        to_role_name: "teacher",
      };
      socket.emit("send_notification", notification);
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
      fetchData(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  React.useEffect(() => {
    //generate messages
    socket.emit("join_room", review_id);
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
              // eslint-disable-next-line eqeqeq
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
            badgeContent={mock.filter((message) => !message.isStudent && !message.isSeen).length}
            color="info"
          >
            <AddCommentOutlined />
          </Badge>
        </IconButton>
      </React.Fragment>
    </div>
  );
}
