import React, { useState } from "react";
import axios from "axios";
import MenuAppBar from "../utils/MenuAppBar";
import UserProvider from "../../contexts/UserProvider";
import { Routes, Route, useParams } from "react-router-dom";
import MemberTab from "./MemberTab";
import StreamTab from "./StreamTab";
import ClassProvider from "../../contexts/ClassProvider";
import { useNavigate, useLocation } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AssignmentTab from "./AssignmentTab";
import GradeManage from "./GradeManage";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ClassContext = React.createContext();

const DetailClassroom = () => {
  const [detailClassData, setDetailClassData] = useState({});
  const [routerTab, setRouterTab] = useState([]);
  const [visited, setVisited] = useState([true, false, false, false]);
  const [assignment, setAssignment] = useState([]);
  const [syllabus, setSyllabus] = useState([]);
  const [loadEffect, setEffect] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const location = useLocation();
  React.useEffect(() => {
    setEffect(false);

    console.log("location - ", location);
    const access_token = localStorage.getItem("access_token");
    const user = JSON.parse(localStorage.getItem("user"));
    //Join class
    axios
      .get(process.env.REACT_APP_API_URL + `/classroom/detail/${id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          //console.log(res.data);
          const data = res.data;
          console.log(data);
          data["isTeacher"] = data.teacherList?.find((t) => t.id === user.id);
          setDetailClassData(data);
          setEffect(true);

          const router = [
            {
              name_header: "Stream",
              link: `/detail-classroom/${res.data.id}/stream`,
              value: 1,
            },
            {
              name_header: "Exercises",
              link: `/detail-classroom/${res.data.id}/exercises`,
              value: 2,
            },
            {
              name_header: "People",
              link: `/detail-classroom/${res.data.id}/member`,
              value: 3,
            },
            {
              name_header: "Grade",
              link: `/detail-classroom/${res.data.id}/grades`,
              value: 4,
            },
          ];
          setRouterTab(router);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("user");
          localStorage.removeItem("access_token");
          setEffect(false);
          navigate("/login");
        } else if (err.response.status === 403) {
          navigate("/classroom");
        } else if (err.response.status === 404) {
          // alert("You do not have permission to access this class");
          setOpen(true);
          setTimeout(() => navigate("/classroom", { replace: true }), 5000);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <UserProvider>
        <div>
          <ClassProvider>
            <MenuAppBar name={detailClassData.name} route_list={routerTab} isHaveHeaderTab={true} />
          </ClassProvider>
          {!loadEffect && <LinearProgress />}
          {/* {detailClassData && ( */}
          <Routes>
            <Route path="/stream" element={<StreamTab data={detailClassData} classId={id} />} />
            <Route
              path="/exercises"
              element={
                <AssignmentTab
                  data={detailClassData}
                  setEffect={setEffect}
                  classId={id}
                  assignmentState={[assignment, setAssignment]}
                  visitedState={[visited, setVisited]}
                />
              }
            />
            <Route path="/member" element={<MemberTab data={detailClassData} />} />
            {/* <Route path="/grades" element={<GradeTab data={detailClassData}/>} /> */}
            <Route
              path="/grades"
              element={
                <GradeManage
                  data={detailClassData}
                  classId={id}
                  visitedState={[visited, setVisited]}
                  syllabusState={[syllabus, setSyllabus]}
                  setEffect={setEffect}
                />
              }
            />
          </Routes>
          {/* )} */}
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
              You do not have permission to access this class !!
            </Alert>
          </Snackbar>
        </div>
      </UserProvider>
    </div>
  );
};

export default DetailClassroom;
