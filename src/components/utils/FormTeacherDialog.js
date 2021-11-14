import React from 'react';
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../config.json";
import UserBar from './UserBar';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';

const FormTeacherDialog = ({ name, data }) => {
    // const handleCancel = () => {
    //     form.resetFields();
    // };
    const [open, setOpen] = React.useState(false);
    const [emailTextField, setEmailTextField] = React.useState("");
    const [listEmail, setListEmail] = React.useState([]);
    const [count, setCount] = React.useState(1);

    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setEmailTextField("");
        setListEmail([]);
        setOpen(false);
    };

    const _handleAddEmail = () => {
        const cloneList = [...listEmail];
        cloneList.push({
            id: count,
            email: emailTextField
        });
        setListEmail(cloneList);
        setEmailTextField("");
        setCount(count + 1);
    }

    const handleSubmit = () => {
        const access_token = localStorage.getItem("access_token");
        axios
            .post(config.API_URL + `/classroom/invite_teacher`, {
                list_email: listEmail,
                invite_code: data.invitecode
            }, {
                headers: { Authorization: `Bearer ${access_token}` },
            })
            .then((res) => {
                if (res.status === 401) {
                    localStorage.removeItem("user");
                    localStorage.removeItem("access_token");
                    navigate("/login");
                } else {
                    if (res.status === 201) {
                        setEmailTextField("");
                        setListEmail([]);
                        setOpen(false);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                localStorage.removeItem("user");
                localStorage.removeItem("access_token");
                navigate("/login");
            });
    }

    const _handleTextFieldChange = (e) => {
        setEmailTextField(e.target.value);
    }

    return (
        <Box>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleClickOpen}
            >
                <PersonAddRoundedIcon style={{ color: '#c26401' }} />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Mời giáo viên</DialogTitle>
                <DialogContent>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        width: 400
                    }}>
                        <Grid item xs={11}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                fullWidth
                                label="Email Address"
                                type="email"
                                variant="standard"
                                value={emailTextField}
                                onChange={_handleTextFieldChange}
                            />
                        </Grid>

                        <Grid item xs={1} mb={1}>
                            <IconButton
                                size="small"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={_handleAddEmail}
                                iconStyle={{ width: 2, height: 2 }}
                            >
                                <AddIcon />
                            </IconButton>
                        </Grid>
                    </Box>
                    <Divider />
                    <List
                        sx={{
                            width: '100%',
                            bgcolor: 'background.paper',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 300,
                            height: 300,
                            '& ul': { padding: 0 }
                        }}
                    >
                        <Grid item xs={12}>
                            <UserBar list={listEmail} setList={setListEmail} />
                        </Grid>
                    </List>
                    <Divider />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy bỏ</Button>
                    <Button onClick={handleSubmit}>Chấp nhận</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default FormTeacherDialog;