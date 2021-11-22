import * as React from "react";
import Box from "@mui/material/Box";
import { Accordion, AccordionSummary, Typography, AccordionDetails } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const GradeTab = ({ data }) => {
  const list = [
    {
      id: "1",
      email: "test 1",
    },
    {
      id: "2",
      email: "test 2",
    },
    {
      id: "3",
      email: "test 3",
    },
  ];
  const [characters, updateCharacters] = React.useState(list);
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateCharacters(items);
  };

  const itemList = characters.map((item, index) => (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <Accordion
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography>Accordion 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
              ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
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
              <List dense={true}>{itemList}</List>
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default GradeTab;
