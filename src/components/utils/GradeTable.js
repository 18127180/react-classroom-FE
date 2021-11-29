import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Grid from "@mui/material/Grid";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import UploadIcon from '@mui/icons-material/Upload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CheckIcon from '@mui/icons-material/Check';
import FormExportDialog from './FormExportDialog';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const list_header = [
    {
        name: 'Math',
        total_grade: 100
    },
    {
        name: 'Physic',
        total_grade: 100
    },
    {
        name: 'Literature',
        total_grade: 100
    },
    {
        name: 'Geography',
        total_grade: 100
    }
]

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const list_rows = [
    {
        name: "Lê Hoàng Phúc 1", score_list: [
            { score: 1, max_score: 100 },
            { score: 2, max_score: 100 },
            { score: 3, max_score: 100 },
            { score: 4, max_score: 100 }
        ]
    },
    {
        name: "Lê Hoàng Phúc 2", score_list: [
            { score: 5, max_score: 100 },
            { score: 6, max_score: 100 },
            { score: 7, max_score: 100 },
            { score: 8, max_score: 100 }
        ]
    },
    {
        name: "Lê Hoàng Phúc 3", score_list: [
            { score: 9, max_score: 100 },
            { score: 10, max_score: 100 },
            { score: 11, max_score: 100 },
            { score: 12, max_score: 100 }
        ]
    },
    {
        name: "Lê Hoàng Phúc 5", score_list: [
            { score: 13, max_score: 100 },
            { score: 14, max_score: 100 },
            { score: 15, max_score: 100 },
            { score: 16, max_score: 100 }
        ]
    },
    {
        name: "Lê Hoàng Phúc 1", score_list: [
            { score: 17, max_score: 100 },
            { score: 18, max_score: 100 },
            { score: 19, max_score: 100 },
            { score: 20, max_score: 100 }
        ]
    },
]

export default function CustomizedTables({ data }) {
    const [listScore, setListScore] = React.useState([]);
    const [loadEffect, setEffect] = React.useState(false);
    const [listHeader, setListHeader] = React.useState([]);
    const navigate = useNavigate();

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
        <Grid container>
            <Grid
                item xs={12}
                sx={{
                    maxHeight: 40,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mr: 2
                }}>
                <Tooltip title="Import">
                    <IconButton aria-label="import">
                        <UploadIcon />
                    </IconButton>
                </Tooltip>
                <FormExportDialog />
            </Grid>
            <Grid item xs={12}>
                <TableContainer sx={{ maxHeight: 500 }}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell sx={{ fontWeight: 'bold', fontSize: 15 }} align="center">Student</StyledTableCell>
                                {listHeader.map((row) => (
                                    <StyledTableCell key={row.subject_name} align="center">
                                        <Box sx={{ fontWeight: 'bold', fontSize: 18 }}>
                                            {row.subject_name}
                                        </Box>
                                        <Box>
                                            <IconButton aria-label="more" sx={{position:'absolute', right:1, top:1}}>
                                                <MoreVertIcon sx={{ color: 'white' }} />
                                            </IconButton>
                                        </Box>
                                        <Box sx={{display:'flex',justifyContent:'center', width:'100%'}}>
                                            <Divider sx={{ backgroundColor: 'white', height: 2 , width: 100}} />
                                        </Box>
                                        <Box>
                                            (total/{row.grade})
                                        </Box>
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listScore.map((row, index) => (
                                <StyledTableRow key={row.student_code}>
                                    <StyledTableCell align="center" sx={{ width: 300 }}>
                                        <List dense={true}>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar src="https://lh3.googleusercontent.com/a/AATXAJz7_SyQiPPSdAYGsJ5O7cuwom9p9TnHXIqxeyb3=s96-c"></Avatar>
                                                </ListItemAvatar>
                                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                    <ListItemText primary={row.full_name} />
                                                    <ListItemText primary={row.student_code} />
                                                </Box>
                                            </ListItem>
                                        </List>
                                    </StyledTableCell>
                                    {row.list_score.map((subRow, subIndex) => (
                                        <StyledTableCell align="center">
                                            <FormControl variant="standard">
                                                <Input
                                                    sx={{ width: '8ch' }}
                                                    id="standard-adornment-weight"
                                                    value={subRow.score}
                                                    // onChange={handleChange('weight')}
                                                    endAdornment={<InputAdornment position="end">/{row.max_score[subIndex]}</InputAdornment>}
                                                    aria-describedby="standard-weight-helper-text"
                                                    onChange={(e) => handleChangeInput(index, e, subIndex, row.max_score[subIndex])}
                                                />
                                            </FormControl>
                                        </StyledTableCell>
                                    ))}
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}