import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
export default function TabHeader({ route }) {
    const [value, setValue] = React.useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const listLink = route.map((link_routing, index) => (
        <Tab value={link_routing.value} label={link_routing.name_header} to={link_routing.link} component={Link} />
    ));

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
            >
                {listLink}
            </Tabs>
        </Box>
    );
}