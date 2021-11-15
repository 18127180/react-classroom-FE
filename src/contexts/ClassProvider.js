import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config.json";
import axios from "axios";
const context = createContext(null);

const ClassProvider = ({ children }) => {
  const [classes, setClasses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
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
          navigate("/login");
        } else {
          setClasses(res.data);
          setLoading(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <context.Provider value={{ classState: [classes, setClasses], loading: loading }}>
      {children}
    </context.Provider>
  );
};

ClassProvider.context = context;

export default ClassProvider;
