import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import UploadIcon from "@mui/icons-material/Upload";
import FormExportDialog from "./FormExportDialog";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";
import axios from "axios";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BackdropProvider from "../../contexts/BackdropProvider";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import Button from "@mui/material/Button";
import { Dialog, Toolbar, AppBar, Slide } from "@mui/material";
import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import style from "../../styles/accordion.css";
import TeacherReviewComment from "../DetailClassroom/TeacherReviewGrade";
import uuid from "react-native-uuid";
import socket from "./Socket";
import PublicIcon from "@mui/icons-material/Public";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/theme";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // [`&.${tableCellClasses.head}`]: {
  //   backgroundColor: theme.palette.common.black,
  //   color: theme.palette.common.white,
  // },
  // [`&.${tableCellClasses.body}`]: {
  //   fontSize: 14,
  // },
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    border: "0.25px solid #ededed",
    maxWidth: "200px",
    width: "200px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: "0.25px solid #ededed",
    padding: 1,
    minWidth: "200px",
  },
}));

const list_header = [
  {
    name: "Math",
    total_grade: 100,
  },
  {
    name: "Physic",
    total_grade: 100,
  },
  {
    name: "Literature",
    total_grade: 100,
  },
  {
    name: "Geography",
    total_grade: 100,
  },
];

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f8f9fa",
  },
  // hide last border
  // "&:last-child td, &:last-child th": {
  //   border: 0,
  // },
}));

export default function CustomizedTables({ data }) {
  const [listScore, setListScore] = React.useState([]);
  const [listMaxScore, setListMaxScore] = React.useState([]);
  const [reload, setReload] = React.useState(0);
  const [loadEffect, setEffect] = React.useState(false);
  const [listHeader, setListHeader] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [curMenu, setCurMenu] = React.useState(null);
  const inputRef = React.createRef();
  const importRef = React.createRef();
  const { setOpenBackdrop } = React.useContext(BackdropProvider.context);
  const [clickAway, setClickAway] = React.useState(false);
  const [studentDataUpdate, setStudentDataUpdate] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const access_token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  const exportGradeTable = () => {
    axios({
      url: process.env.REACT_APP_API_URL + "/upload/download/grade-table?class_id=" + data.id, //your url
      method: "GET",
      responseType: "blob", // important
      headers: {
        Authorization: "Bearer " + access_token,
      },
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Grade List Template.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickAway = (i, j) => {
    if (clickAway === false) {
      console.log("ClickAway: ", i + " " + j);
      console.log(studentDataUpdate);
      setClickAway(true);
      if (studentDataUpdate) {
        const access_token = localStorage.getItem("access_token");
        axios
          .put(
            process.env.REACT_APP_API_URL + "/classroom/grade-table",
            {
              student_data: studentDataUpdate,
              list_header: listHeader,
            },
            {
              headers: {
                Authorization: "Bearer " + access_token,
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
            }
          })
          .catch((err) => {});
      }
    }
    // const arr = [...listScore];
    // arr[i].list_score[j].isClickAway = false;
    // setListScore(arr);
    // const access_token = localStorage.getItem("access_token");
    // axios
    //   .put(
    //     process.env.REACT_APP_API_URL + "/classroom/grade-table",
    //     {
    //       id: data.id,
    //       student_data: arr[i],
    //       list_header: listHeader,
    //     },
    //     {
    //       headers: {
    //         Authorization: "Bearer " + access_token,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     if (res.status === 200) {
    //     }
    //   })
    //   .catch((err) => { });
  };

  //handle import click
  const onChangeImportHandler = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file.name.split(".")[1] !== "xlsx") {
      alert("Can only import .xlsx file !!!");
      // setOpen(true);
      return;
    }
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("id", data.id);
    axios
      .post(process.env.REACT_APP_API_URL + "/upload", formdata, {
        // receive two parameter endpoint url ,form data
        headers: {
          Authorization: "Bearer " + access_token,
        },
      })
      .then((res) => {
        // then print response status
        if (res.statusText === "OK") {
          console.log(res.data);
          setListScore([...listScore, ...res.data]);
          // xu ly
        }
      })
      .catch((err) => {
        alert("Something's wrong !!!");
      });
  };

  const onClickHandler = () => {
    importRef.current.click();
  };

  //handle the menu item
  const handleClickMenu = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setCurMenu(Number(event.currentTarget.getAttribute("data-id")));
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleImport = (e) => {
    inputRef.current.click();
    setAnchorEl(null);
  };
  const handleFinalize = () => {
    setAnchorEl(null);
    const access_token = localStorage.getItem("access_token");
    const header = listHeader.find((h) => h.id === curMenu);
    console.log(header);
    axios
      .put(
        process.env.REACT_APP_API_URL + "/syllabus/" + curMenu,
        {
          finalize: !header.finalize,
        },
        {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        }
      )
      .then((res) => {
        // then print response status
        if (res.statusText === "OK") {
          const user = JSON.parse(localStorage.getItem("user"));
          const notification = {
            uuid: uuid.v1(),
            sender_name: "Teacher " + user.last_name + " " + user.first_name,
            sender_avatar: user.avatar
              ? user.avatar
              : "https://cdn-icons-png.flaticon.com/512/194/194935.png",
            message:
              "Teacher " +
              user.last_name +
              " " +
              user.first_name +
              ` has finalized ${header.subject_name} grade`,
            has_read: false,
            link_navigate: `/detail-classroom/${data.id}/grades`,
            time: Date.now(),
            class_id: data.id,
            to_role_name: "student",
          };
          socket.emit("send_notification", notification);

          const tempList = listHeader.map((h) => {
            if (h.id === curMenu) {
              return res.data;
            }
            return h;
          });
          setListHeader(tempList);
        }
      })
      .catch((err) => {
        alert("Something's wrong !!!");
      });
  };

  //upload
  const onChangeHandler = (event) => {
    const file = event.target.files[0];
    if (file.name.split(".")[1] !== "xlsx") {
      alert("Can only import .xlsx file !!!");
      return;
    }
    setOpenBackdrop(true);
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("syllabus_id", curMenu);
    formdata.append("syllabus_maxGrade", listHeader.find((row) => row.id === curMenu).grade);
    axios
      .post(process.env.REACT_APP_API_URL + "/upload/grade-list", formdata, {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      })
      .then((res) => {
        // then print response status
        if (res.status === 200) {
          // xu ly
          setReload(reload + 1);
        }
      })
      .catch((err) => {
        setOpenBackdrop(false);
        if (err.response.data.error === 1) {
          alert("There's at least 1 grade that exceed the maximum grade.");
        }
      });
  };

  const handleChangeInput = (i, event, subIndex, max_score) => {
    // console.log('ok');
    setClickAway(false);
    const arr = [...listScore];
    setStudentDataUpdate(arr[i]);
    const value = event.target.value;
    // console.log("i " + i + " j" + subIndex);
    if (!isNaN(+value) || value === "") {
      if (value !== "" && value >= max_score) {
        arr[i].list_score[subIndex] = max_score;
        let total_score = 0;
        for (let j = 0; j < arr[i].list_score.length - 1; j++) {
          total_score = total_score + Number(arr[i].list_score[j]);
        }
        arr[i].list_score[arr[i].list_score.length - 1] = total_score;
        setListScore(arr);
      } else {
        arr[i].list_score[subIndex] = Number(event.target.value);
        let total_score = 0;
        for (let j = 0; j < arr[i].list_score.length - 1; j++) {
          total_score = total_score + Number(arr[i].list_score[j]);
        }
        arr[i].list_score[arr[i].list_score.length - 1] = total_score;
        setListScore(arr);
      }
    } else {
      arr[i].list_score[subIndex] = 0;
      let total_score = 0;
      for (let j = 0; j < arr[i].list_score.length - 1; j++) {
        total_score = total_score + Number(arr[i].list_score[j]);
      }
      arr[i].list_score[arr[i].list_score.length - 1] = total_score;
      setListScore(arr);
    }
  };

  React.useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    axios
      .get(process.env.REACT_APP_API_URL + `/classroom/grade-table?class_id=${data.id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          let list_header = res.data.list_header;
          setListHeader(list_header);

          let max_score_list = [];
          for (let item of list_header) {
            max_score_list.push(item.grade);
          }
          setListMaxScore(max_score_list);
          console.log(res.data.grade_table_list);
          setListScore(res.data.grade_table_list);
          setEffect(true);
          if (reload > 0) {
            setOpenBackdrop(false);
          }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            maxHeight: 40,
            display: "flex",
            justifyContent: "flex-end",
            mr: 2,
          }}
        >
          <input
            type="file"
            hidden
            name="file"
            ref={importRef}
            onChange={onChangeImportHandler}
            onClick={(e) => (e.target.value = null)}
          ></input>
          <Tooltip title="Import student list">
            <IconButton aria-label="import">
              <UploadIcon onClick={onClickHandler} />
            </IconButton>
          </Tooltip>
          <FormExportDialog class_id={data.id} />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            maxHeight: 40,
            display: "flex",
            justifyContent: "flex-end",
            mr: 2,
          }}
        >
          <Button variant="contained" onClick={handleClickOpen}>
            Manage Review
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={exportGradeTable}
            sx={{ mr: 1, ml: 1 }}
            startIcon={<UploadFileRoundedIcon />}
          >
            Export Grade
          </Button>
          <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar sx={{ position: "fixed" }} color="primary">
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  Grade review
                </Typography>
              </Toolbar>
            </AppBar>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="space-between"
              sx={{ marginTop: "64px" }}
            >
              <TeacherReviewComment data={data} />
            </Grid>
          </Dialog>
        </Grid>
        <Grid item xs={12}>
          <TableContainer sx={{ maxHeight: 500 }}>
            {/* bo width = unset de table full width */}
            <Table aria-label="customized table" stickyHeader sx={{ width: "unset" }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ fontWeight: "bold", fontSize: 15 }} align="center">
                    Student
                  </StyledTableCell>
                  {listHeader.map((row) => (
                    <StyledTableCell key={row.id} align="center" sx={{ maxWidth: "200px" }}>
                      <Box sx={{ fontWeight: "bold", fontSize: 18 }}>{row.subject_name}</Box>
                      <Box>
                        <IconButton
                          aria-label="more"
                          sx={{ position: "absolute", right: 1, top: 1 }}
                          data-id={row.id}
                          onClick={handleClickMenu}
                        >
                          <MoreVertIcon
                            sx={{
                              color: "#f2f2f2",
                              "&:hover, &:focus-within": { color: "black" },
                            }}
                          />
                        </IconButton>
                      </Box>
                      {row.finalize ? (
                        <Box sx={{ position: "absolute", left: 1, top: 1, mt: 1, ml: 1 }}>
                          <PublicIcon
                            sx={{
                              color: "black",
                            }}
                          />
                        </Box>
                      ) : (
                        <Box></Box>
                      )}
                      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                        <Divider sx={{ backgroundColor: "white", height: 2, width: 100 }} />
                      </Box>
                      <Box>(total/{row.grade})</Box>
                    </StyledTableCell>
                  ))}
                  <StyledTableCell key="totalFinal" align="center" sx={{ maxWidth: "200px" }}>
                    <Box sx={{ fontWeight: "bold", fontSize: 18 }}>Total</Box>
                    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                      <Divider sx={{ backgroundColor: "white", height: 2, width: 100 }} />
                    </Box>
                    <Box>
                      (total/
                      {listMaxScore.reduce(function (acc, val) {
                        return acc + val;
                      }, 0)}
                      )
                    </Box>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listScore.map((row, index) => (
                  <StyledTableRow key={row.student_code}>
                    <StyledTableCell align="center" sx={{ width: 300 }}>
                      {row.isexist ? (
                        <List dense={true}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar src={row.avatar}></Avatar>
                            </ListItemAvatar>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                              <ListItemText primary={row.full_name} />
                              <ListItemText primary={row.student_code} />
                            </Box>
                          </ListItem>
                        </List>
                      ) : (
                        <List dense={true}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar sx={{ backGroundColor: "red" }}>
                                <AccountCircleIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                              <ListItemText sx={{ color: "#bdbdbd" }} primary={row.full_name} />
                              <ListItemText sx={{ color: "#bdbdbd" }} primary={row.student_code} />
                            </Box>
                          </ListItem>
                        </List>
                      )}
                    </StyledTableCell>
                    {row.list_score.map((subRow, subIndex) => {
                      if (listMaxScore.length - subIndex === 0) {
                        return (
                          <StyledTableCell align="center">
                            <FormControl variant="standard">
                              <Input
                                sx={{ width: "8ch" }}
                                id="standard-adornment-weight"
                                value={subRow}
                                endAdornment={
                                  <InputAdornment position="end">
                                    /
                                    {listMaxScore.reduce(function (acc, val) {
                                      return acc + val;
                                    }, 0)}
                                  </InputAdornment>
                                }
                                aria-describedby="standard-weight-helper-text"
                                disabled={true}
                              />
                            </FormControl>
                          </StyledTableCell>
                        );
                      } else {
                        if (subRow != null) {
                          return (
                            <ClickAwayListener
                              onClickAway={(e) => handleClickAway(index, subIndex)}
                            >
                              <StyledTableCell align="center">
                                <FormControl variant="standard">
                                  <Input
                                    sx={{ width: "8ch" }}
                                    id="standard-adornment-weight"
                                    value={subRow}
                                    endAdornment={
                                      <InputAdornment position="end">
                                        /{listMaxScore[subIndex]}
                                      </InputAdornment>
                                    }
                                    onChange={(e) =>
                                      handleChangeInput(index, e, subIndex, listMaxScore[subIndex])
                                    }
                                    aria-describedby="standard-weight-helper-text"
                                  />
                                </FormControl>
                              </StyledTableCell>
                            </ClickAwayListener>
                          );
                        } else {
                          return <StyledTableCell align="center"></StyledTableCell>;
                        }
                      }
                      // <StyledTableCell align="center">
                      //   <FormControl variant="standard">
                      //     <Input
                      //       sx={{ width: "8ch" }}
                      //       id="standard-adornment-weight"
                      //       value={subRow}
                      //       // onChange={handleChange('weight')}
                      //       endAdornment={
                      //         <InputAdornment position="end">
                      //           /{listMaxScore[subIndex]}
                      //         </InputAdornment>
                      //       }
                      //       aria-describedby="standard-weight-helper-text"
                      //     />
                      //   </FormControl>

                      {
                        /* {subRow.isClickAway ? (
                          <ClickAwayListener onClickAway={(e) => handleClickAway(index, subIndex)}>
                            <FormControl variant="standard">
                              <Input
                                sx={{ width: "8ch" }}
                                id="standard-adornment-weight"
                                value={subRow.score}
                                // onChange={handleChange('weight')}
                                endAdornment={
                                  <InputAdornment position="end">
                                    /{row.max_score[subIndex]}
                                  </InputAdornment>
                                }
                                aria-describedby="standard-weight-helper-text"
                                onChange={(e) =>
                                  handleChangeInput(index, e, subIndex, row.max_score[subIndex])
                                }
                                autoFocus={true}
                              />
                            </FormControl>
                          </ClickAwayListener>
                        ) : (
                          <FormControl variant="standard">
                            <Input
                              sx={{ width: "8ch" }}
                              id="standard-adornment-weight"
                              value={subRow.score}
                              // onChange={handleChange('weight')}
                              endAdornment={
                                <InputAdornment position="end">
                                  /{row.max_score[subIndex]}
                                </InputAdornment>
                              }
                              aria-describedby="standard-weight-helper-text"
                              onChange={(e) =>
                                handleChangeInput(index, e, subIndex, row.max_score[subIndex])
                              }
                              onClick={(e) => handleClickIn(index, subIndex)}
                            />
                          </FormControl>
                        )} */
                      }
                      // </StyledTableCell>
                    })}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        {/* upload section */}
        <input
          type="file"
          hidden
          name="file"
          ref={inputRef}
          onChange={onChangeHandler}
          onClick={(e) => (e.target.value = null)}
        ></input>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleImport}>Import Grade</MenuItem>
          <MenuItem onClick={handleFinalize}>Finalize Score</MenuItem>
        </Menu>
      </Grid>
    </ThemeProvider>
  );
}
