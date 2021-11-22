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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const GradeTab = ({ data }) => {
    const list = [
        {
            id: "1",
            email: "test 1"
        },
        {
            id: "2",
            email: "test 2"
        },
        {
            id: "3",
            email: "test 3"
        },
    ]
    const [characters, updateCharacters] = React.useState(list);
    const handleOnDragEnd = (result) =>{
        if(!result.destination) return;
        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        updateCharacters(items);
    }

    const itemList = characters.map((item, index) => (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided) => (
                <Box pt={0.5} pb={0.5} sx={{ boxShadow: 0.5 }} style={{ borderBottom: "1px solid #D7DAE9" }}>
                    <ListItem
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete" >
                                <DeleteIcon />
                            </IconButton>
                        }
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
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
            )}
        </Draggable>
    ));
    return (
        <Box
            sx={{
                width: "100%",
            }}
        >
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="characters">
                    {(provided) => (
                        <Grid item xs={12} {...provided.droppableProps} ref={provided.innerRef}>
                            <List dense={true}>
                                {itemList}
                            </List>
                            {provided.placeholder}
                        </Grid>
                    )}
                </Droppable>
            </DragDropContext>
        </Box>
    );
};

export default GradeTab;