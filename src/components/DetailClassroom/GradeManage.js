import React from "react";
import GradeTable from "../utils/GradeTable";
import StudentGrade from "./StudentGrade";

const GradeManage = ({ data, classId, visitedState, syllabusState, setEffect }) => {
  return data.isTeacher ? (
    <GradeTable data={data} />
  ) : (
    <StudentGrade
      data={data}
      classId={classId}
      visitedState={visitedState}
      syllabusState={syllabusState}
      setEffect={setEffect}
    />
  );
};

export default GradeManage;
