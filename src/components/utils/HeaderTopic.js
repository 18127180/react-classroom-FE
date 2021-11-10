import React from 'react';
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';


const HeaderTopic = ({ name }) => {
    // const handleCancel = () => {
    //     form.resetFields();
    // };

    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                m: 1,
                p: 3,
                width: '60%',
                height: '5rem',
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid',
                borderBottomColor: '#c26401'
            }}
        >
            <Box sx={{
                fontWeight: 'medium',
                fontSize: 30,
                color: '#c26401'
            }}>
                {name}
            </Box>
            <Box>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <PersonAddRoundedIcon style={{ color: '#c26401'}}/>
                </IconButton>
            </Box>
        </Box>
    );
}

export default HeaderTopic;