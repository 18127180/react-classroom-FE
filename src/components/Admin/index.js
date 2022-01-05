import React from "react";
import UserProvider from "../../contexts/UserProvider";
import MenuAppBar from "../utils/MenuAppBar";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import { Box, List, ListItemText, ListItemIcon, ListItem } from "@mui/material";
import "../../styles/admin.css";
import UserTable from "./UserTable";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SchoolIcon from "@mui/icons-material/School";
import logo from "../../styles/class-logo.jpg"; // with require
import { Routes, Route, useNavigate } from "react-router-dom";
import AdminTable from "./AdminTable";
import ClassTable from "./ClassTable";

const drawerWidth = 200;

const Admin = () => {
  const navigate = useNavigate();
  const [now, setNow] = React.useState(0);
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user.role) {
      navigate("/classroom");
    }
  });
  return (
    <UserProvider>
      <MenuAppBar name="Admin" isHaveSidebar={false} />
      <Box style={{ maxWidth: "100%", display: "flex" }}>
        <Drawer
          id="admin-drawer"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar>
            <img src={logo} style={{ height: "150px", margin: "20px auto" }} alt="logo" />
          </Toolbar>
          <Divider />
          <List>
            <ListItem
              button
              className={`side-list-item ${now === 1 ? "now" : ""}`}
              onClick={() => {
                setNow(1);
                navigate("/admin/admins");
              }}
            >
              <ListItemIcon>
                <AdminPanelSettingsIcon sx={{ ml: 2 }} />
              </ListItemIcon>
              <ListItemText primary="Admin" />
            </ListItem>
            <ListItem
              button
              className={`side-list-item ${now === 2 ? "now" : ""}`}
              onClick={() => {
                setNow(2);
                navigate("/admin/users");
              }}
            >
              <ListItemIcon>
                <SupervisorAccountIcon sx={{ ml: 2 }} />
              </ListItemIcon>
              <ListItemText primary="User" />
            </ListItem>
            <ListItem
              button
              className={`side-list-item ${now === 3 ? "now" : ""}`}
              onClick={() => {
                setNow(3);
                navigate("/admin/classes");
              }}
            >
              <ListItemIcon>
                <SchoolIcon sx={{ ml: 2 }} />
              </ListItemIcon>
              <ListItemText primary="Classroom" />
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
          <Routes>
            <Route path="/admins" element={<AdminTable />} />
            <Route path="/users" element={<UserTable />} />
            <Route path="/classes" element={<ClassTable />} />
          </Routes>
        </Box>
      </Box>
    </UserProvider>
  );
};

export default Admin;
