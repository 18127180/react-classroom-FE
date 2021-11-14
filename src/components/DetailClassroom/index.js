import React, { useState } from "react";
import axios from "axios";
import MenuAppBar from "../utils/MenuAppBar";
import UserProvider from "../../contexts/UserProvider";
import { Routes, Route, useParams } from "react-router-dom";
import MemberTab from "./MemberTab";
import StreamTab from "./StreamTab";
import config from "../../config.json";
import ClassProvider from "../../contexts/ClassProvider";
import { useNavigate, useLocation } from "react-router-dom";

export const ClassContext = React.createContext();

const DetailClassroom = () => {
  const [detailClassData, setDetailClassData] = useState({});
  const [routerTab, setRouterTab] = useState([]);
  const [loadEffect, setEffect] = React.useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { search } = useLocation();
  React.useEffect(() => {
    const query = new URLSearchParams(search);
    const invite_code = query.get('cjc');
    const access_token = localStorage.getItem("access_token");
    const user = JSON.parse(localStorage.getItem("user"));
    //Join class
    if (invite_code) {
      axios
        .post(config.API_URL + `/classroom/join`, {
          email: user?.email,
          invite_code
        }, {
          headers: { Authorization: `Bearer ${access_token}` },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("Join class success!")
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            localStorage.removeItem("user");
            localStorage.removeItem("access_token");
            localStorage.setItem("current_link", `/detail-classroom/${id}?cjc=${invite_code}`);
            setEffect(false);
            navigate("/login");
          }
        });
    }
    axios
      .get(config.API_URL + `/classroom/detail/${id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("user");
          localStorage.removeItem("access_token");
          setEffect(false);
          navigate("/login");
        } else {
          if (res.status === 200) {
            setDetailClassData(res.data);
            setEffect(true);
            setRouterTab([
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
            ]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        //token expired or not login yet
        //so do basic log out process
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        setEffect(false);
        navigate("/login");
      });
  }, []);

  return (
    <div>
      {loadEffect ? (
        <div>
          <ClassProvider>
            <UserProvider>
              <MenuAppBar route_list={routerTab} isHaveHeaderTab={true} />
            </UserProvider>
          </ClassProvider>
          <Routes>
            <Route
              path="/stream"
              element={<StreamTab data={detailClassData} />}
            />
            <Route
              path="/member"
              element={<MemberTab data={detailClassData} />}
            />
          </Routes>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default DetailClassroom;
