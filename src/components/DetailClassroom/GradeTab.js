import * as React from "react";
import Box from "@mui/material/Box";
import { Accordion, AccordionSummary, Typography, AccordionDetails, Link } from "@mui/material";
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
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Topic } from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axios from "axios";
import { useNavigate, useRef } from "react-router-dom";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Dialog, Toolbar, AppBar, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import style from "../../styles/accordion.css";
import BackdropProvider from "../../contexts/BackdropProvider";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GradeTab = ({ data, openState }) => {
  const [characters, updateCharacters] = React.useState([]);
  const [topic, setTopic] = React.useState("Grade structure");
  const [description, setDescription] = React.useState("Description");
  const [loadEffect, setEffect] = React.useState(false);
  const [idStructure, setIdStructure] = React.useState(0);
  const [visable, setVisable] = React.useState(false);
  const [open, setOpen] = openState;
  const { setOpenBackdrop } = React.useContext(BackdropProvider.context);
  const navigate = useNavigate();

  //handle the grade dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeTopic = (event) => {
    setTopic(event.target.value);
  };
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };
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
      grade: 0,
      new: true,
      finalize: false
    });
    updateCharacters(items);
    console.log(items);
  };

  const handleRemove = (id) => {
    const newList = characters.filter((item) => item.id !== id);
    updateCharacters(newList);
  };

  const handleHide = () => {
    setVisable(!visable);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateCharacters(items);
  };

  const handleUpdate = () => {
    const access_token = localStorage.getItem("access_token");
    setOpenBackdrop(true);
    axios
      .put(
        process.env.REACT_APP_API_URL + "/classroom/grade-structure",
        {
          id: idStructure,
          class_id: data.id,
          topic: topic,
          description: description,
          list_syllabus: characters,
        },
        {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        }
      )
      .then((res) => {
        setOpenBackdrop(false);
        if (res.status === 200) {
          updateCharacters(res.data?.list_syllabus);
          setTopic(res.data?.topic);
          setDescription(res.data?.description);
          setIdStructure(res.data?.id);
          setVisable(false);
        }
      })
      .catch((err) => {
        setOpenBackdrop(false);
      });
  };

  const itemList = characters.map((item, index) => (
    <Draggable
      key={"" + item.id}
      draggableId={"" + item.id}
      index={index}
      isDragDisabled={!visable}
    >
      {(provided) => (
        <Accordion
          disableGutters={true}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          sx={{
            mt: 2,
          }}
          expanded={false}
        >
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <FormControl variant="standard" sx={{ flex: 4, mt: 2 }}>
              {/* <InputLabel htmlFor="component-simple">Name</InputLabel> */}
              <Input
                id="component-simple"
                value={item.subject_name}
                onChange={(e) => handleChangeName(index, e)}
                placeholder="Topic"
                disabled={!visable}
              />
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
                onChange={(e) => handleChangeGrade(index, e)}
                disabled={!visable}
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
      .get(process.env.REACT_APP_API_URL + `/classroom/grade-structure?class_id=${data.id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
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
      {loadEffect ? (
        <React.Fragment>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              width: "100%",
            }}
            onClick={handleClickOpen}
          >
            Manage
          </Button>
          <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar sx={{ position: "relative" }} color="secondary">
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  Grade structure
                </Typography>
              </Toolbar>
            </AppBar>
            <Grid container direction="column" alignItems="center" justifyContent="space-between">
              {/* <Button onClick={onDownload} variant="contained" color="primary">
            Student list
          </Button>
          <Button onClick={onDownload2} variant="contained" color="primary">
            Grades list
          </Button> */}
              <Box
                sx={{
                  width: "60%",
                  mt: 2,
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
                <Button variant="contained" onClick={handleHide}>
                  Edit
                </Button>
              </Box>
              <Box
                sx={{
                  width: "60%",
                }}
              >
                <FormControl variant="standard" fullWidth size="medium">
                  <Input
                    id="component-simple"
                    sx={{ fontSize: 40 }}
                    value={topic}
                    onChange={handleChangeTopic}
                    placeholder="Topic"
                  />
                </FormControl>
                <FormControl variant="standard" fullWidth>
                    <Input
                      id="component-simple"
                      sx={{ fontSize: 20, mt: 2 }}
                      value={description}
                      onChange={handleChangeDescription}
                      placeholder="Description"
                    />
                </FormControl>
              </Box>
              <Box
                sx={{
                  width: "60%",
                  justifyContent: "center",
                  mt: 2,
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
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                {visable ? (
                  <div>
                    <IconButton color="primary" onClick={handleAddItem}>
                      <AddCircleRoundedIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={handleUpdate}>
                      <CheckCircleOutlineIcon />
                    </IconButton>
                  </div>
                ) : (
                  <div></div>
                )}
              </Box>
            </Grid>
          </Dialog>
        </React.Fragment>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default GradeTab;
