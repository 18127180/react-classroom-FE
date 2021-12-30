import * as React from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import AddCommentOutlined from "@mui/icons-material/AddCommentOutlined";
import { Badge, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";
import { ChatController, MuiChat } from "chat-ui-react";
import "./ReviewComment.css";

const drawerWidth = 520;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function ReviewComment({ setCommenting, syllabus }) {
  const theme = useTheme();
  const [state, setState] = useState(false);
  const { syllabus_name, syllabus_id } = syllabus;
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
      content: "Mong thay xem xet",
      isStudent: true,
      avatar:
        "https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.18169-1/cp0/p86x86/15542053_340996142952805_2049033225934452726_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=dbb9e7&_nc_ohc=En4rN_34GnkAX-jGALs&_nc_ht=scontent.fsgn5-9.fna&oh=00_AT8kCLkgpwGvyvrxXRLdmHrvjF6KZX1MRcRn68I11c-kYA&oe=61F480E5",
      isSeen: false,
      createAt: new Date(),
    },
    {
      id: 2,
      syllabus_id: 4,
      content: "Toi ko thich day",
      isStudent: false,
      avatar:
        "https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.18169-1/cp0/p86x86/15542053_340996142952805_2049033225934452726_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=dbb9e7&_nc_ohc=En4rN_34GnkAX-jGALs&_nc_ht=scontent.fsgn5-9.fna&oh=00_AT8kCLkgpwGvyvrxXRLdmHrvjF6KZX1MRcRn68I11c-kYA&oe=61F480E5",
      isSeen: false,
      createAt: new Date(),
    },
  ];

  chatCtl.setActionRequest({ type: "text", always: true }, (response) => {
    console.log(response.value);
  });

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setCommenting(open);
    setState(open);
  };

  React.useEffect(() => {
    //generate messages
    async function fetchData() {
      try {
        for (const message of mock) {
          await chatCtl.addMessage({
            type: "text",
            content: message.content,
            self: message.isStudent,
            avatar: message.avatar,
            createdAt: message.createAt,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
