import React from "react";
import ClassroomList from "./ClassroomList";
import axios from "axios";
import config from "../../config.json";
import MenuAppBar from "../utils/MenuAppBar";
import UserProvider from "../../contexts/UserProvider";
import { useNavigate } from "react-router-dom";

export const ClassContext = React.createContext();

const Home = () => {
  // const [moreClass, setMoreClass] = React.useState(false);
  const [classes, setClasses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [loadEffect, setEffect] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    axios
      .get(config.API_URL + `/classroom`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        if (res.status === 401) {
          //token expired or not login yet
          //so do basic log out process
          localStorage.removeItem("user");
          localStorage.removeItem("access_token");
          setEffect(false);
          navigate("/login");
        } else {
          setClasses(res.data);
          setLoading(false);
          setEffect(true);
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
      {
        loadEffect ? (
          <ClassContext.Provider value={[classes, setClasses]} >
            <UserProvider>
              <MenuAppBar canAddClass={true} />
              <ClassroomList classes={classes} loading={loading} />
            </UserProvider>
          </ClassContext.Provider >
        ) : (<div></div>)
      }
    </div>
  );
};

export default Home;
