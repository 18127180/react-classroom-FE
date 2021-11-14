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


const FormStudentDialog = ({ name, data }) => {
    // const handleCancel = () => {
    //     form.resetFields();
    // };
    const [open, setOpen] = React.useState(false);
    const [emailTextField, setEmailTextField] = React.useState("");
    const [listEmail, setListEmail] = React.useState([]);
    const link_public_invite = config.WEB_URL+`/detail-classroom/${data.id}?cjc=${data.invitecode}`

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
        cloneList.push(emailTextField);
        setListEmail(cloneList);
        setEmailTextField("");
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
                <DialogTitle>Mời học sinh</DialogTitle>
                <DialogContent>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Invite link"
                            type="link_public"
                            fullWidth
                            variant="standard"
                            value={link_public_invite}
                        />
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <PersonAddRoundedIcon style={{ color: '#c26401' }} />
                        </IconButton>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={emailTextField}
                            onChange={_handleTextFieldChange}
                        />
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={_handleAddEmail}
                        >
                            <PersonAddRoundedIcon style={{ color: '#c26401' }} />
                        </IconButton>
                    </Box>
                    <Divider />
                    <Box
                        sx={{
                            bgcolor: 'background.paper',
                            width: '25rem'
                        }}
                    >
                        <Grid item xs={12} md={11}>
                            <UserBar list={listEmail} />
                        </Grid>
                    </Box>
                    <Divider />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy bỏ</Button>
                    <Button onClick={handleSubmit}>Mời</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default FormStudentDialog;