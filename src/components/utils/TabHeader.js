import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

export default function TabHeader({ route }) {
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const useStyles = makeStyles({
    hover: {
      "&:hover": {
        color: "#fc2c03",
      },
    },
  });
  const classes = useStyles();

  const listLink = route.map((link_routing, index) => (
    <Tab
      value={link_routing.value}
      label={link_routing.name_header}
      to={link_routing.link}
      className={classes.hover}
      component={Link}
    />
  ));

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        {listLink}
      </Tabs>
    </Box>
  );
}
