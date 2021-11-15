import React from 'react';
import Box from '@mui/material/Box';


const HeaderTopic = ({ name, FormDialog }) => {
    // const handleCancel = () => {
    //     form.resetFields();
    // };

    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                mt:2,
                width: '60%',
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
                {FormDialog}
            </Box>
        </Box>
    );
}

export default HeaderTopic;