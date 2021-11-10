import React from 'react';
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import HeaderTopic from '../utils/HeaderTopic'

const MemberTab = ({ form, setSuccess, onSuccess, onFailed }) => {
    // const handleCancel = () => {
    //     form.resetFields();
    // };

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
        <HeaderTopic name="Giáo viên"/>
        <HeaderTopic name="Sinh viên"/>
        </Grid>
    );
}

export default MemberTab;