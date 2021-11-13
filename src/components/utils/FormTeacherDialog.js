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


const FormTeacherDialog = ({ name, data }) => {
    // const handleCancel = () => {
    //     form.resetFields();
    // };
    const [open, setOpen] = React.useState(false);
    const [emailTextField, setEmailTextField] = React.useState("");
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        const access_token = localStorage.getItem("access_token");
        console.log(access_token);
        axios
            .post(config.API_URL + `/classroom/invite_teacher`, {
                email: emailTextField,
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
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={_handleTextFieldChange}
                    />
                    <Divider />
                    <Box
                        sx={{
                            bgcolor: 'background.paper',
                            p: 3,
                            height: '5rem',
                            display: 'flex',
                        }}
                    >

                    </Box>
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