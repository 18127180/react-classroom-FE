import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";

export default function TabHeader({ route }) {
  const [value, setValue] = React.useState(1);
  const location = useLocation();
  React.useEffect(() => {
    const idx = route.findIndex((r) => r.link === location.pathname);
    setValue(idx + 1);
  }, [route]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const useStyles = makeStyles({
    hover: {
      fontSize: 17,
      textTransform: "none",
      fontFamily: '"Google Sans",Roboto,Arial,sans-serif,',
      "&:hover": {
        color: "#fc2c03",
      },
    },
  });
  const classes = useStyles();

  const listLink = route.map((link_routing, index) => (
    <Tab
      key={index}
      value={link_routing.value}
      label={link_routing.name_header}
      to={link_routing.link}
      className={classes.hover}
      component={Link}
    />
  ));

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        justifySelf: "self-start",
        position: "absolute",
      }}
    >
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
