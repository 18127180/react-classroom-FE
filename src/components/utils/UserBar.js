import * as React from "react";
import Box from "@mui/material/Box";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

export default function UserBar({ list }) {
    // const [listEmail, setListEmail] = React.useState(list);

    const itemList = list.map((item, index) => (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemAvatar>
                <Avatar>
                    <FolderIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={item}
            />
        </ListItem>
    ));
    // console.log(list);

    return (
        <Box
            sx={{
                width: "100%",
                backgroundColor: 'red'
            }}
        >
            <Grid item xs={12} md={8}>
                <List dense={true}>
                    {itemList}
                </List>
            </Grid>
        </Box>
    );
}
