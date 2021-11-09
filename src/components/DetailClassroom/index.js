import React from "react";
// import ClassroomList from "./ClassroomList";
// import axios from "axios";
// import config from "../../config.json";
import MenuAppBar from "../utils/MenuAppBar";
import UserProvider from "../../contexts/UserProvider";
import { Routes, Route } from 'react-router-dom';
import Test from './Test'

export const ClassContext = React.createContext();

const DetailClassroom = () => {
    const router_tab = [
        {name_header: "Bảng tin", link:"/detail-classroom/newfeed", value:1},
        {name_header: "Bài tập trên lớp", link:"/detail-classroom/exercises", value:2},
        {name_header: "Mọi người", link:"/detail-classroom/member", value:3},
        {name_header: "Số điểm", link:"/detail-classroom/grades", value:4}
    ]
    //   const [moreClass, setMoreClass] = React.useState(false);
    //   const [classes, setClasses] = React.useState([]);
    //   const [loading, setLoading] = React.useState(true);
    //   React.useEffect(() => {
    //     const access_token = localStorage.getItem("access_token");
    //     axios
    //       .get(config.API_URL + "/classroom", {
    //         headers: { Authorization: `Bearer ${access_token}` },
    //       })
    //       .then((res) => {
    //         setClasses(res.data);
    //         setLoading(false);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   }, [moreClass]);
    return (
        <div>
            <ClassContext.Provider>
                <UserProvider>
                    <MenuAppBar route_list = {router_tab} isHaveHeaderTab={true}/>
                </UserProvider>
            </ClassContext.Provider>
            <Routes>
                <Route path='/member' element={<Test />} />
            </Routes>
        </div>
    );
};

export default DetailClassroom;
