import React from "react";
import Grid from "@mui/material/Grid";
import GradeTable from "../utils/GradeTable";

const GradeManage = ({ data }) => {
  return (
      <GradeTable data={data}/>
  );
};

export default GradeManage;