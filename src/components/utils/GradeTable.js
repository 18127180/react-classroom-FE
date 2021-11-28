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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CustomizedTables() {
    return (
        <TableContainer sx={{ maxHeight: 540 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table" stickyHeader>
                <TableHead>
                    <TableRow>
                        <StyledTableCell sx={{ fontWeight: 'bold', fontSize: 15 }}>Full name of student</StyledTableCell>
                        {list_header.map((row) => (
                            <StyledTableCell key={row.name} align="center">
                                <Box sx={{ fontWeight: 'bold', fontSize: 18 }}>
                                    {row.name}
                                </Box>
                                <Box>
                                    <Divider sx={{ backgroundColor: 'white', height: 2 }} />
                                </Box>
                                <Box>
                                    (total/{row.total_grade})
                                </Box>
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell align="center">
                                <List dense={true}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar src="https://lh3.googleusercontent.com/a/AATXAJz7_SyQiPPSdAYGsJ5O7cuwom9p9TnHXIqxeyb3=s96-c"></Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={row.name} />
                                    </ListItem>
                                </List>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <FormControl variant="standard" sx={{ width: '10ch' }}>
                                    <Input
                                        id="standard-adornment-weight"
                                        // value={row.fat}
                                        // onChange={handleChange('weight')}
                                        endAdornment={<InputAdornment position="end">/100</InputAdornment>}
                                        aria-describedby="standard-weight-helper-text"
                                    />
                                </FormControl>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <FormControl variant="standard" sx={{ width: '10ch' }}>
                                    <Input
                                        id="standard-adornment-weight"
                                        // value={row.fat}
                                        // onChange={handleChange('weight')}
                                        endAdornment={<InputAdornment position="end">/100</InputAdornment>}
                                        aria-describedby="standard-weight-helper-text"
                                    />
                                </FormControl>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                            <FormControl variant="standard" sx={{ width: '10ch' }}>
                                    <Input
                                        id="standard-adornment-weight"
                                        // value={row.fat}
                                        // onChange={handleChange('weight')}
                                        endAdornment={<InputAdornment position="end">/100</InputAdornment>}
                                        aria-describedby="standard-weight-helper-text"
                                    />
                                </FormControl>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                            <FormControl variant="standard" sx={{ width: '10ch' }}>
                                    <Input
                                        id="standard-adornment-weight"
                                        // value={row.fat}
                                        // onChange={handleChange('weight')}
                                        endAdornment={<InputAdornment position="end">/100</InputAdornment>}
                                        aria-describedby="standard-weight-helper-text"
                                    />
                                </FormControl>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}