import { useState, Fragment } from "react";
import * as React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import { Avatar, Badge, Container, Grid } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ITEM_HEIGHT = 64;

const Notification = () => {
  const [newNotification, setNewNotification] = useState(0);
  const [anchorNotification, setanchorNotification] = useState(null);
  const [index, setIndex] = useState(null);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      senderName: "Nhan Rui",
      senderAvatar:
        "https://lh3.googleusercontent.com/ogw/ADea4I46BRajOkt5wQOxWnzcV3aYpK6JzLRYTWQkh94=s64-c-mo",
      message: "Nhan Rui has posted something in class",
      hasRead: true,
      link: "https://www.facebook.com/lehoang.phuc.52",
      time: Date.now(),
    },
  ]);

  const handleNotificationMenu = (event) => {
    setanchorNotification(event.currentTarget);
  };
  const handleCloseNotificationMenu = () => {
    setanchorNotification(null);
  };
  const handleClickNotification = (id) => {
    setIndex(id);
    setNotifications(
      notifications.map((el) => (el.id === id ? Object.assign({}, el, { hasRead: true }) : el))
    );
    setNewNotification(newNotification - 1);
    //thao mock thay window = navigate
    // navigate(`${link}`)
    window.location.redirect = "facebook.com/lehoang.phuc.52";
  };

  React.useEffect(() => {
    //sort theo thoi gian nha
    const mocks = [
      {
        id: 2,
        senderName: "Phuc Map",
        senderAvatar:
          "https://lh3.googleusercontent.com/ogw/ADea4I46BRajOkt5wQOxWnzcV3aYpK6JzLRYTWQkh94=s64-c-mo",
        message: "Phuc Map has modified your grade.",
        hasRead: false,
        link: "https://www.facebook.com/lehoang.phuc.52",
        time: Date.now(),
      },
    ];
    const tempNotifications = [...mocks, ...notifications];
    console.log(tempNotifications);
    setNotifications(tempNotifications);
    setNewNotification(tempNotifications.filter((noti) => noti.hasRead === false).length);
  }, []);
  return (
    <Fragment>
      <IconButton
        sx={{ ml: 1, mr: 1 }}
        size="medium"
        onClick={handleNotificationMenu}
        aria-controls="menu-notifications"
        aria-haspopup="true"
      >
        <Badge badgeContent={newNotification} color="primary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        id="menu-notifications"
        anchorEl={anchorNotification}
        sx={{ top: 0, minWidth: 400 }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorNotification)}
        onClose={handleCloseNotificationMenu}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 5,
            width: "400px",
          },
        }}
      >
        <Container sx={{ textAlign: "left", padding: "0 !important" }}>
          <Grid container direction="column">
            {notifications.map((noti, index) => (
              <Grid
                item
                sx={{
                  borderBottom: index === notifications.length - 1 ? "none" : "1px solid black",
                  padding: 1,
                  "&:hover": {
                    background: "#d7d7d7",
                    cursor: "pointer",
                  },
                }}
                id={`notification-${noti.id}`}
                onClick={() => handleClickNotification(noti.id)}
              >
                <Grid container direction="row">
                  <Grid item xs={1.5} alignSelf="center">
                    <Avatar
                      alt={noti.senderName}
                      src={noti.senderAvatar}
                      sx={{ width: 40, height: 40, mr: "auto" }}
                    ></Avatar>
                  </Grid>
                  <Grid item xs={10}>
                    <Grid container spacing={1}>
                      <Grid item>
                        <Typography
                          sx={{
                            lineHeight: 1.2,
                            fontSize: noti.hasRead ? "14.25px" : "14px",
                            fontWeight: noti.hasRead ? "none" : "bold",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            "-webkit-line-clamp": "2" /* number of lines to show */,
                            "line-clamp": "2",
                            "-webkit-box-orient": "vertical",
                          }}
                        >
                          {noti.message}
                        </Typography>
                      </Grid>
                      <Grid item sx={{ ml: "auto", mr: 1.5, color: "#7e7777" }}>
                        <Typography sx={{ fontSize: "12px" }}>
                          {new Date(noti.time).toUTCString()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={0.5} alignSelf="center">
                    {!noti.hasRead && (
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          background: "red",
                          borderRadius: "50%",
                        }}
                      ></div>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
          {/* <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Log out</ListItemText>
        </MenuItem> */}
        </Container>
      </Menu>
    </Fragment>
  );
};

export default Notification;
