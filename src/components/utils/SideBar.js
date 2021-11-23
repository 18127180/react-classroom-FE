import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { ListSubheader } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import ClassProvider from "../../contexts/ClassProvider";

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
      width: 35,
      height: 35,
      fontSize: 17,
    },
    children: `${name.split(" ")[0][0]}${
      name.split(" ")[1] !== undefined ? name.split(" ")[1][0] : ""
    }`,
  };
}

const SideBar = ({ name }) => {
  // eslint-disable-next-line no-unused-vars
  const { classState, loading } = React.useContext(ClassProvider.context);
  // eslint-disable-next-line no-unused-vars
  const [classes, setClasses] = classState;
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => {
    return (
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List onClick={() => navigate("/classroom")}>
          <ListItem button key={"Home"}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListSubheader>{`Teaching`}</ListSubheader>
          {classes.map((item, index) => {
            if (item.teacher) {
              const url = name !== item.name;
              return (
                <ListItem
                  button
                  key={`class-${item.id}`}
                  onClick={() => url && navigate(`/detail-classroom/${item.id}/stream`)}
                >
                  <ListItemIcon>
                    <Avatar {...stringAvatar(item.name)} />
                  </ListItemIcon>
                  <ListItemText primary={`${item.name}`} />
                </ListItem>
              );
            }
            return null;
          })}
        </List>
        <Divider />
        <List>
          <ListSubheader>{`Enrolled`}</ListSubheader>
          {classes.map((item, index) => {
            if (item.student) {
              const url = name !== item.name;
              return (
                <ListItem
                  button
                  key={`class-${item.id}`}
                  onClick={() =>
                    url && navigate(`/detail-classroom/${item.id}/stream`, { replace: true })
                  }
                >
                  <ListItemIcon>
                    <Avatar {...stringAvatar(item.name)} />
                  </ListItemIcon>
                  <ListItemText primary={`${item.name}`} />
                </ListItem>
              );
            }
            return null;
          })}
        </List>
      </Box>
    );
  };

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, zIndex: 10 }}
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default React.memo(SideBar);
