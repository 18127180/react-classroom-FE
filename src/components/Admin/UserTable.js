import { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { forwardRef } from "react";

import AddBox from "@mui/icons-material/AddBox";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import Check from "@mui/icons-material/Check";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Clear from "@mui/icons-material/Clear";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Edit from "@mui/icons-material/Edit";
import FilterList from "@mui/icons-material/FilterList";
import FirstPage from "@mui/icons-material/FirstPage";
import LastPage from "@mui/icons-material/LastPage";
import Remove from "@mui/icons-material/Remove";
import SaveAlt from "@mui/icons-material/SaveAlt";
import Search from "@mui/icons-material/Search";
import ViewColumn from "@mui/icons-material/ViewColumn";
import SaveIcon from "@mui/icons-material/Save";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} sx={{ color: "#0c9723 " }} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} sx={{ color: "#f2af4a" }} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

// const tempdata = [
//   {
//     id: "1",
//     first_name: "Thien Nhan",
//     last_name: "Luu",
//     email: "nhanluu838@gmail.com",
//     student_code: "18127165",
//     status: "Locked",
//     createdAt: "2022-01-03",
//   },
//   {
//     id: "2",
//     first_name: "Quang Minh",
//     last_name: "Nguyen",
//     email: "nminh7953@gmail.com",
//     student_code: "18127180",
//     status: "Active",
//     createdAt: "2022-01-03",
//   },
// ];

const UserTable = () => {
  const [userData, setUserData] = useState([]);
  const access_token = localStorage.getItem("access_token");

  // useEffect(() => {
  //   axios
  //     .get(
  //       process.env.REACT_APP_API_URL +
  //       `/user/all-users`,
  //       {
  //         headers: { Authorization: `Bearer ${access_token}` },
  //       }
  //     )
  //     .then((res) => {
  //       if (res.status === 200) {
  //         setUserData(res.data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        icons={tableIcons}
        columns={[
          { title: "ID", field: "id", searchable: false, sorting: false, editable: "never" },
          { title: "Email", field: "email", sorting: false, editable: "never" },
          { title: "Student code", field: "student_code", searchable: false, sorting: false },
          { title: "Status", field: "status", searchable: false, editable: "never" },
          {
            title: "Created at",
            field: "createdAt",
            type: "date",
            searchable: false,
            editable: "never",
          },
        ]}
        data={(query) =>
          new Promise((resolve, reject) => {
            let url = process.env.REACT_APP_API_URL + "/user/users?";
            url += "per_page=" + query.pageSize;
            url += "&page=" + (query.page + 1);
            url += "&createdAt=" + (query.orderDirection || "desc");
            url += "&search=" + query.search || "";
            fetch(url, {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            })
              .then((response) => response.json())
              .then((result) => {
                setUserData(result.data);
                resolve({
                  data: result.data,
                  page: result.page - 1,
                  totalCount: result.total,
                });
              });
          })
        }
        title="Users"
        actions={[
          {
            icon: () => <SaveIcon color="primary" />,
            tooltip: "Save User",
            onClick: (event, rowData) => alert("You saved user " + rowData.id),
          },
          (rowData) => {
            if (rowData.status === "Locked")
              return {
                icon: () => <LockOpenIcon sx={{ color: "#0c9723" }} />,
                tooltip: "Unlock User",
                onClick: (event, rowData) => {
                  rowData.status = "Active";
                  setUserData(
                    userData.map((dat) =>
                      dat.id === rowData.id ? { ...dat, status: "Active" } : dat
                    )
                  );
                  axios
                    .put(
                      process.env.REACT_APP_API_URL + `/user/update-status`,
                      {
                        rowData,
                      },
                      {
                        headers: { Authorization: `Bearer ${access_token}` },
                      }
                    )
                    .then((res) => {
                      if (res.status === 200) {
                        // setUserData(res.data);
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                },
              };
            else {
              return {
                icon: () => <LockIcon sx={{ color: "red" }} />,
                tooltip: "Lock User",
                onClick: (event, rowData) => {
                  rowData.status = "Locked";
                  setUserData(
                    userData.map((dat) =>
                      dat.id === rowData.id ? { ...dat, status: "Locked" } : dat
                    )
                  );
                  axios
                    .put(
                      process.env.REACT_APP_API_URL + `/user/update-status`,
                      {
                        rowData,
                      },
                      {
                        headers: { Authorization: `Bearer ${access_token}` },
                      }
                    )
                    .then((res) => {
                      if (res.status === 200) {
                        // setUserData(res.data);
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                },
              };
            }
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...userData];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setUserData([...dataUpdate]);
                axios
                  .put(
                    process.env.REACT_APP_API_URL + `/user/update-student-code`,
                    {
                      newData,
                    },
                    {
                      headers: { Authorization: `Bearer ${access_token}` },
                    }
                  )
                  .then((res) => {
                    if (res.status === 200) {
                      resolve();
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }, 1000);
            }),
        }}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
        detailPanel={(rowData) => {
          const user = userData[rowData.tableData.id];
          return (
            <section class="user-detail">
              <div class="profile-info">
                <img
                  src={user.avatar ? user.avatar : "https://source.unsplash.com/100x100/?face"}
                  alt={(user.first_name || "") + " " + (user.last_name || "")}
                />
                <div class="desc">
                  <h3 class="name">{(user.first_name || "") + " " + (user.last_name || "")}</h3>
                  <h5>{user.role}</h5>
                  <h5>
                    {" "}
                    Date joined:{" "}
                    <strong>{new Date(user.createdAt).toLocaleString().split(" ")[1]}</strong>{" "}
                  </h5>
                </div>
              </div>
              <div class="basic-details profile-item">
                <h4> Basic Details </h4>
                <ul class="info">
                  <li>
                    {" "}
                    <EmailIcon />
                    <span class="email-text"> {user.email} </span>{" "}
                  </li>
                </ul>
              </div>
            </section>
          );
        }}
      />
    </div>
  );
};

export default UserTable;
