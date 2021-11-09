import React from "react";
import ClassroomList from "./ClassroomList";
import axios from "axios";
import config from "../../config.json";
import MenuAppBar from "./MenuAppBar";
import UserProvider from "../../contexts/UserProvider";

export const ClassContext = React.createContext();

const Home = () => {
  const [moreClass, setMoreClass] = React.useState(false);
  const [classes, setClasses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    axios
      .get(config.API_URL + "/classroom", {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        setClasses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [moreClass]);
  console.log("render Home");
  return (
    <div>
      <ClassContext.Provider value={[moreClass, setMoreClass]}>
        <UserProvider>
          <MenuAppBar />
          <ClassroomList classes={classes} loading={loading} />
        </UserProvider>
      </ClassContext.Provider>
    </div>
  );
};

export default Home;
