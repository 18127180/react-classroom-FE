import React from "react";
import ClassroomList from "./ClassroomList";
import MenuAppBar from "../utils/MenuAppBar";
import UserProvider from "../../contexts/UserProvider";
import ClassProvider from "../../contexts/ClassProvider";
import { useNavigate } from "react-router-dom";

export const ClassContext = React.createContext();

const Home = () => {
  const navigate = useNavigate();
  const [loadEffect, setEffect] = React.useState(false);
  React.useEffect(() => {
    setEffect(true);
    if (!JSON.parse(localStorage.getItem("user"))) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      {/* {loadEffect ? (
        <ClassContext.Provider value={[classes, setClasses]}>
          <ClassProvider>
            <UserProvider>
              <MenuAppBar canAddClass={true} />
              <ClassroomList />
            </UserProvider>
          </ClassProvider>
        </ClassContext.Provider>
      ) : (
        <div></div>
      )} */}
      {/* <ClassContext.Provider value={[classes, setClasses]}> */}
      {loadEffect && (
        <ClassProvider>
          <UserProvider>
            <MenuAppBar name="Classroom" canAddClass={true} />
            <ClassroomList />
          </UserProvider>
        </ClassProvider>
      )}
      {/* </ClassContext.Provider> */}
    </div>
  );
};

export default Home;
