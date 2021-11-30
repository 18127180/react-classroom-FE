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
import ClickAwayListener from '@mui/material/ClickAwayListener';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
  const [reload, setReload] = React.useState(0);
  const [loadEffect, setEffect] = React.useState(false);
  const [listHeader, setListHeader] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [curMenu, setCurMenu] = React.useState(null);
  const inputRef = React.createRef();
  const importRef = React.createRef();
  const { setOpenBackdrop } = React.useContext(BackdropProvider.context);
  const navigate = useNavigate();

  const handleClickAway = (i, j) => {
    const arr = [...listScore];
    console.log("away" + i + j);
    arr[i].list_score[j].isClickAway = false;
    setListScore(arr);
  }

  const handleClickIn = (i, j) => {
    const arr = [...listScore];
    console.log("click" + i + j);
    arr[i].list_score[j].isClickAway = true;
    setListScore(arr);
  }

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
      .post("http://localhost:4000/upload", formdata, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        if (res.statusText === "OK") {
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
      .post("http://localhost:4000/upload/grade-list", formdata)
      .then((res) => {
        // then print response status
        if (res.status === 200) {
          // xu ly
          setReload(reload + 1);
          // setOpenBackdrop(false);
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
    const arr = [...listScore];
    const value = event.target.value;
    if (!isNaN(+value) || value === "") {
      if (value !== "" && value >= max_score) {
        arr[i].list_score[subIndex].score = max_score;
        setListScore(arr);
      } else {
        arr[i].list_score[subIndex].score = event.target.value;
        setListScore(arr);
      }
    } else {
      arr[i].list_score[subIndex].score = 0;
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
          setListHeader(res.data.list_header);
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
                  <StyledTableCell key={row.subject_name} align="center" sx={{ maxWidth: "200px" }}>
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
                    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                      <Divider sx={{ backgroundColor: "white", height: 2, width: 100 }} />
                    </Box>
                    <Box>(total/{row.grade})</Box>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {listScore.map((row, index) => (
                <StyledTableRow key={row.student_code}>
                  <StyledTableCell align="center" sx={{ width: 300 }}>
                    {row.isExist ? (
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
                            <Avatar sx={{ backGroundColor: 'red' }}>
                              <AccountCircleIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <ListItemText sx={{ color: '#bdbdbd' }} primary={row.full_name} />
                            <ListItemText sx={{ color: '#bdbdbd' }} primary={row.student_code} />
                          </Box>
                        </ListItem>
                      </List>
                    )}
                  </StyledTableCell>
                  {row.list_score.map((subRow, subIndex) => (
                    <StyledTableCell align="center">
                      {subRow.isChange ? (
                        subRow.isClickAway ? (
                          <ClickAwayListener onClickAway={(e) => handleClickAway(index, subIndex)}>
                            < FormControl variant="standard">
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
                          </ClickAwayListener>) : (
                          < FormControl variant="standard">
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
                          </FormControl>)

                      ) : (
                        <div></div>
                      )}
                    </StyledTableCell>
                  ))}
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
      </Menu>
    </Grid >
  );
}
