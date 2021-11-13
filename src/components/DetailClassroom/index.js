import React, { useState } from "react";
import axios from "axios";
import MenuAppBar from "../utils/MenuAppBar";
import UserProvider from "../../contexts/UserProvider";
import { Routes, Route, useParams } from "react-router-dom";
import MemberTab from "./MemberTab";
import StreamTab from "./StreamTab";
import config from "../../config.json";
import { useNavigate } from "react-router-dom";

export const ClassContext = React.createContext();

const DetailClassroom = () => {
  const [detailClassData, setDetailClassData] = useState({});
  const [routerTab, setRouterTab] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    axios
      .get(config.API_URL + `/classroom/detail/${id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("user");
          localStorage.removeItem("access_token");
          navigate("/login");
        } else {
          if (res.status === 200) {
            setDetailClassData(res.data);
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
        navigate("/login");
      });
  }, []);
  console.log(detailClassData);
  return (
    <div>
      <ClassContext.Provider>
        <UserProvider>
          <MenuAppBar route_list={routerTab} isHaveHeaderTab={true} />
        </UserProvider>
      </ClassContext.Provider>
      <Routes>
        <Route path="/stream" element={<StreamTab data={detailClassData} />} />
        <Route path="/member" element={<MemberTab />} />
      </Routes>
    </div>
  );
};

export default DetailClassroom;
