import React from "react";
import GradeTable from "../utils/GradeTable";
import StudentGrade from "./StudentGrade";

const GradeManage = ({ data, visitedState, syllabusState, setEffect }) => {
  return data.isTeacher ? (
    <GradeTable data={data} />
  ) : (
    <StudentGrade
      data={data}
      visitedState={visitedState}
      syllabusState={syllabusState}
      setEffect={setEffect}
    />
  );
};

export default GradeManage;
