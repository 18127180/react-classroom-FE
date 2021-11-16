import * as React from "react";
import Box from "@mui/material/Box";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function UserBar({ list, setList }) {
    // const [listEmail, setListEmail] = React.useState(list);
    const handleRemove = (id) => {
        const newList = list.filter((item) => item.id !== id);
        setList(newList);
    }

    // console.log(list);

    const itemList = list.map((item) => (
        <Box key={item.id} pt={0.5} pb={0.5} sx={{ boxShadow: 0.5 }} style={{ borderBottom: "1px solid #D7DAE9" }}>
            <ListItem
                secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemove(item.id)}>
                        <DeleteIcon />
                    </IconButton>
                }
            >
                <ListItemAvatar>
                    <Avatar>
                        <AccountCircleIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={item.email}
                />
            </ListItem>
        </Box>
    ));
    // console.log(list);

    return (
        <Box
            sx={{
                width: "100%",
            }}
        >
            <Grid item xs={12}>
                <List dense={true}>
                    {itemList}
                </List>
            </Grid>
        </Box>
    );
}
