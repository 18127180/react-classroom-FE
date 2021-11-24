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
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Topic } from "@mui/icons-material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const GradeTab = ({ data }) => {
  const [characters, updateCharacters] = React.useState([]);
  const [topic, setTopic] = React.useState('Grade structure');
  const [description, setDescription] = React.useState('Description');
  const [loadEffect, setEffect] = React.useState(false);
  const [idStructure, setIdStructure] = React.useState(0);
  const [visable, setVisable] = React.useState(false);
  const navigate = useNavigate();

  const handleChangeTopic = (event) => {
    setTopic(event.target.value)
  }
  const handleChangeDescription = (event) => {
    setDescription(event.target.value)
  }
  const handleChangeGrade = (i, event) => {
    const arr = [...characters];
    arr[i].grade = Number(event.target.value);
    updateCharacters(arr);
  };

  const handleChangeName = (i, event) => {
    const arr = [...characters];
    arr[i].subject_name = event.target.value;
    updateCharacters(arr);
  };

  const handleAddItem = () => {
    let items = Array.from(characters);
    items.push({
      id: "" + (characters.length + 1),
      subject_name: "",
      grade: 0
    })
    updateCharacters(items);
    console.log(items);
  }

  const handleRemove = (id) => {
    const newList = characters.filter((item) => item.id !== id);
    updateCharacters(newList);
  }

  const handleHide = () => {
    setVisable(!visable);
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateCharacters(items);
  };

  const handleUpdate = () => {
    const access_token = localStorage.getItem("access_token");
    axios
      .put(
        process.env.REACT_APP_API_URL + "/classroom/grade-structure",
        {
          id: idStructure,
          class_id: data.id,
          topic: topic,
          description: description,
          list_syllabus: characters
        },
        {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        if (res.status === 200) {
          //console.log("ok");
          setVisable(false);
        }
      })
      .catch((err) => {
        //console.log(err);
      });
  }

  const itemList = characters.map((item, index) => (
    <Draggable key={"" + item.id} draggableId={"" + item.id} index={index} isDragDisabled={!visable}>
      {(provided) => (
        <Accordion
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          sx={{
            mt: 2
          }}
        >
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <FormControl variant="standard" sx={{ flex: 4, mt:2 }}>
              {/* <InputLabel htmlFor="component-simple">Name</InputLabel> */}
              <Input id="component-simple" value={item.subject_name} onChange={e => handleChangeName(index, e)} placeholder="Topic"/>
            </FormControl>
            <Box sx={{ flex: 1 }}>
              <TextField
                id="outlined-number"
                label="Grade"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={item.grade}
                onChange={e => handleChangeGrade(index, e)}
              />
            </Box>
            <IconButton aria-label="delete" onClick={() => handleRemove(item.id)}>
              <DeleteIcon />
            </IconButton>
          </AccordionSummary>
        </Accordion>
      )}
    </Draggable>
  ));

  React.useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    axios
      .get(
        process.env.REACT_APP_API_URL + `/classroom/grade-structure?class_id=${data.id}`,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          updateCharacters(res.data?.list_syllabus);
          setTopic(res.data?.topic);
          setDescription(res.data?.description);
          setIdStructure(res.data?.id);
          setEffect(true);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("user");
          localStorage.removeItem("access_token");
          setEffect(false);
          navigate("/login");
        }
      });
  }, []);

  return (
    <div>
      {
        loadEffect ? (
          <Grid container direction="column" alignItems="center" justifyContent="space-between" >
            <Box sx={{
              width: "60%",
              mt: 2,
              display: 'flex',
              flexDirection: 'row-reverse',
            }}>
              <Button variant="outlined" onClick={handleHide}>Edit</Button>
            </Box>
            <Box sx={{
              width: "60%",
            }}>
              <FormControl variant="standard" fullWidth size="medium" >
                <Input id="component-simple" sx={{ fontSize: 40 }} value={topic} onChange={handleChangeTopic} placeholder="Topic" />
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <Input id="component-simple" sx={{ fontSize: 20, mt: 2 }} value={description} onChange={handleChangeDescription} placeholder="Description" />
              </FormControl>
            </Box>
            <Box
              sx={{
                width: "60%",
                justifyContent: 'center',
                mt: 2
              }}
            >
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="characters">
                  {(provided) => (
                    <Box {...provided.droppableProps} ref={provided.innerRef}>
                      <List dense={true}>{itemList}</List>
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </DragDropContext>
            </Box>
            <Box
              sx={{
                width: "60%",
                justifyContent: 'center',
                display: 'flex'
              }}
            >
              {
                visable ? (
                  <div>
                    <IconButton color="primary" onClick={handleAddItem}>
                      <AddCircleRoundedIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={handleUpdate}>
                      <CheckCircleOutlineIcon />
                    </IconButton>
                  </div>
                ) : (<div>
                </div>)}
            </Box>
          </Grid >
        ) : (
          <div></div>
        )}
    </div>
  );
};

export default GradeTab;
