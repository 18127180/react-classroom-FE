import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Avatar, Container, ListItemIcon, ListItemText } from "@mui/material";
import UserProvider from "../../contexts/UserProvider";
import SideBar from "./SideBar";
import TabHeader from "./TabHeader";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/theme";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CreateClassDialog from "../classroom/CreateClassDialog";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function MenuAppBar({ route_list, isHaveHeaderTab }) {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useContext(UserProvider.context);
  const navigate = useNavigate();
  console.log(user);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenu2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAddClass = () => {
    setAnchorEl2(null);
    setOpen(true);
  };
  const handleJoinClass = () => {
    setAnchorEl2(null);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    navigate("/login", { replace: true });
  };

  console.log("render MenuAppBar");
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <SideBar />
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                width: "calc(50vw - 260px)",
              }}
            >
              Classroom
            </Typography>
            {isHaveHeaderTab && <TabHeader route={route_list} />}
            {auth && (
              <div>
                <IconButton
                  size="mediums"
                  aria-label="control class of current user"
                  aria-controls="class_control"
                  aria-haspopup="true"
                  onClick={handleMenu2}
                  color="inherit"
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  size="medium"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  {user.avatar ? (
                    <Avatar
                      alt={user.first_name + " " + user.last_name}
                      src={user.avatar}
                      sx={{ width: 30, height: 30 }}
                    ></Avatar>
                  ) : (
                    <Avatar
                      {...stringAvatar(user.first_name + " " + user.last_name)}
                      sx={{ width: 30, height: 30 }}
                    />
                  )}
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
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
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <Container>
                    <IconButton>
                      {user.avatar ? (
                        <Avatar
                          alt={user.first_name + " " + user.last_name}
                          src={user.avatar}
                          sx={{ width: 60, height: 60 }}
                        ></Avatar>
                      ) : (
                        <Avatar
                          {...stringAvatar(
                            user.first_name + " " + user.last_name
                          )}
                          sx={{ width: 60, height: 60 }}
                        />
                      )}
                    </IconButton>
                    <Typography sx={{ textAlign: "center" }}>
                      {user && user.first_name + " " + user.last_name}
                    </Typography>
                  </Container>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <AccountBoxIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Log out</ListItemText>
                  </MenuItem>
                </Menu>
                {/* add class menu */}
                <Menu
                  id="class_control"
                  anchorEl={anchorEl2}
                  sx={{ top: 5, minWidth: 400 }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl2)}
                  onClose={() => setAnchorEl2(null)}
                >
                  <MenuItem onClick={handleJoinClass}>Join class</MenuItem>
                  <MenuItem onClick={handleAddClass}>Create class</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      {/* dialog */}
      <CreateClassDialog open={open} handleClose={handleCloseDialog} />
    </ThemeProvider>
  );
}
