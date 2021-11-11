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


const FormDialog = ({ name }) => {
    // const handleCancel = () => {
    //     form.resetFields();
    // };
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default FormDialog;