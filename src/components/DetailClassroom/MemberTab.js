import React from 'react';
import Grid from "@mui/material/Grid";
import HeaderTopic from '../utils/HeaderTopic'
import FormTeacherDialog from '../utils/FormTeacherDialog';

const MemberTab = ({data}) => {
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
        <HeaderTopic name="Giáo viên" dataClass={data} FormDialog={<FormTeacherDialog data={data}/>}/>
        <HeaderTopic name="Sinh viên"/>
        </Grid>
    );
}

export default MemberTab;