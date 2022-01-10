import { useState, Fragment, useRef } from "react";
import * as React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import { Avatar, Badge, Container, Grid } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import socket from "./Socket";
import moment from "moment-timezone";

const ITEM_HEIGHT = 64;

const Notification = ({ data }) => {
  const [newNotification, setNewNotification] = useState(0);
  const [anchorNotification, setanchorNotification] = useState(null);
  const [index, setIndex] = useState(null);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState();
  const access_token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user"));
  let tempListNotfication = useRef([]);

  const handleNotificationMenu = (event) => {
    setanchorNotification(event.currentTarget);
  };
  const handleCloseNotificationMenu = () => {
    setanchorNotification(null);
  };
  const handleClickNotification = (uuid, link) => {
    axios
      .put(
        process.env.REACT_APP_API_URL + `/classroom/update-status-notifications`,
        {
          uuid: uuid,
          has_read: true,
        },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setIndex(uuid);
          setNotifications(
            notifications.map((el) =>
              el.uuid === uuid ? Object.assign({}, el, { has_read: true }) : el
            )
          );
          setNewNotification(newNotification - 1);
          navigate(`${link}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // window.location.redirect = "facebook.com/lehoang.phuc.52";
  };

  // React.useEffect(() => {
  //   //generate messages
  //   socket.on("receive_comment_" + review_id, (data) => {
  //     console.log(data);
  //     fetchData(data);
  //   })
  // }, [socket]);

  React.useEffect(() => {
    //sort theo thoi gian nha
    // const mocks = [
    //   {
    //     id: 2,
    //     senderName: "Phuc Map",
    //     senderAvatar:
    //       "https://lh3.googleusercontent.com/ogw/ADea4I46BRajOkt5wQOxWnzcV3aYpK6JzLRYTWQkh94=s64-c-mo",
    //     message: "Phuc Map has modified your grade.",
    //     hasRead: false,
    //     link: "https://www.facebook.com/lehoang.phuc.52",
    //     time: Date.now(),
    //   },
    // ];
    // const tempNotifications = [...mocks, ...notifications];
    // setNotifications(tempNotifications);
    // setNewNotification(tempNotifications.filter((noti) => noti.hasRead === false).length);
    axios
      .get(process.env.REACT_APP_API_URL + `/classroom/all-notifications`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          tempListNotfication.current = res.data;
          setNotifications(tempListNotfication.current);
          setNewNotification(
            tempListNotfication.current.filter((noti) => noti.has_read === false).length
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(process.env.REACT_APP_API_URL + `/classroom/all-channel`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          for (let item of res.data) {
            socket.on("receive_notification_" + item.class_id + "_" + item.role_name, (data) => {
              tempListNotfication.current.unshift(data);
              setNotifications(tempListNotfication.current);
              setNewNotification(
                tempListNotfication.current.filter((noti) => noti.has_read === false).length
              );
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    socket.on("receive_notification_private_" + user.id, (data) => {
      tempListNotfication.current.unshift(data);
      console.log(tempListNotfication.current);
      setNotifications(tempListNotfication.current);
      setNewNotification(
        tempListNotfication.current.filter((noti) => noti.has_read === false).length
      );
    });
  }, [socket]);
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
            {notifications &&
              (notifications.length === 0 ? (
                <div>
                  <img
                    src="https://res.cloudinary.com/teepublic/image/private/s--InSnRNha--/t_Resized%20Artwork/c_fit,g_north_west,h_954,w_954/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_90,w_630/v1573575424/production/designs/6700820_0.jpg"
                    style={{ height: "320px", width: "100%" }}
                  ></img>
                </div>
              ) : (
                notifications.map((noti, index) => (
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
                    id={`notification-${noti.uuid}`}
                    onClick={() => handleClickNotification(noti.uuid, noti.link_navigate)}
                  >
                    <Grid container direction="row">
                      <Grid item xs={1.5} alignSelf="center">
                        <Avatar
                          alt={noti.sender_name}
                          src={noti.sender_avatar}
                          sx={{ width: 40, height: 40, mr: "auto" }}
                        ></Avatar>
                      </Grid>
                      <Grid item xs={10}>
                        <Grid container spacing={1}>
                          <Grid item>
                            <Typography
                              sx={{
                                lineHeight: 1.2,
                                fontSize: noti.has_read ? "14.25px" : "14px",
                                fontWeight: noti.has_read ? "none" : "bold",
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
                              {moment
                                .tz(noti.time, "Asia/Saigon")
                                .format("dddd, MMMM Do YYYY, h:mm:ss a")}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={0.5} alignSelf="center">
                        {!noti.has_read && (
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
                ))
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
