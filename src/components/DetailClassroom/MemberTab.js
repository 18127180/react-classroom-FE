import React from "react";
import Grid from "@mui/material/Grid";
import HeaderTopic from "../utils/HeaderTopic";
import FormTeacherDialog from "../utils/FormTeacherDialog";
import FormStudentDialog from "../utils/FormStudentDialog";
import UserBarInClass from "../utils/UserBarInClass";

const MemberTab = ({ data }) => {
  return (
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
      <HeaderTopic name="Teacher" dataClass={data} FormDialog={<FormTeacherDialog data={data} />} />
      <UserBarInClass list={data.teacherList} />
      <HeaderTopic name="Student" dataClass={data} FormDialog={<FormStudentDialog data={data} />} />
      <UserBarInClass list={data.studentList} />
    </Grid>
  );
};

export default MemberTab;
