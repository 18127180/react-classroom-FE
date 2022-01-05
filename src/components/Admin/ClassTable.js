import React from "react";
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
import { Avatar, Chip, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment } from "react";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
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

const data = [
  {
    id: 1,
    name: "Web programming",
    section: "Web",
    teachers: [
      {
        name: "Narui",
        avatar:
          "https://scontent-sin6-1.xx.fbcdn.net/v/t1.6435-1/p100x100/97291515_2722794567830001_9103251667125534720_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=7206a8&_nc_ohc=v8cE8PXj8PMAX8rIu6z&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-sin6-1.xx&oh=00_AT8mrP9GcmuQsglOtUbR-cdJ7qxv9OV8smvBsZ-mEtEmEw&oe=61F89ACF",
      },
      {
        name: "Phuc map",
        avatar:
          "https://scontent-sin6-1.xx.fbcdn.net/v/t1.6435-1/p100x100/97291515_2722794567830001_9103251667125534720_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=7206a8&_nc_ohc=v8cE8PXj8PMAX8rIu6z&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-sin6-1.xx&oh=00_AT8mrP9GcmuQsglOtUbR-cdJ7qxv9OV8smvBsZ-mEtEmEw&oe=61F89ACF",
      },
    ],
    students: [
      {
        name: "Son Map",
        avatar:
          "https://scontent-sin6-1.xx.fbcdn.net/v/t1.6435-1/p100x100/97291515_2722794567830001_9103251667125534720_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=7206a8&_nc_ohc=v8cE8PXj8PMAX8rIu6z&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-sin6-1.xx&oh=00_AT8mrP9GcmuQsglOtUbR-cdJ7qxv9OV8smvBsZ-mEtEmEw&oe=61F89ACF",
      },
      {
        name: "Thanh Oni",
        avatar:
          "https://scontent-sin6-1.xx.fbcdn.net/v/t1.6435-1/p100x100/97291515_2722794567830001_9103251667125534720_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=7206a8&_nc_ohc=v8cE8PXj8PMAX8rIu6z&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-sin6-1.xx&oh=00_AT8mrP9GcmuQsglOtUbR-cdJ7qxv9OV8smvBsZ-mEtEmEw&oe=61F89ACF",
      },
    ],
    grade_structure: [
      {
        name: "Midterm",
        max: 100,
      },
      {
        name: "Final",
        max: 456,
      },
    ],
    topic: "Bla bla bla",
  },
  {
    id: 2,
    name: "NFT",
    section: "Blockchain",
    topic: "Bla bla bla",
  },
  {
    id: 3,
    name: "Automation Testing",
    section: "Test",
    topic: "Bla bla bla",
  },
];

const ClassTable = () => {
  const access_token = localStorage.getItem("access_token");
  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        icons={tableIcons}
        columns={[
          { title: "ID", field: "id" },
          { title: "Name", field: "name" },
          { title: "Section", field: "section" },
          { title: "Topic", field: "topic" },
          {
            title: "Created at",
            field: "created_date",
            type: "date",
            searchable: false,
            editable: "never",
          },
        ]}
        data={(query) =>
          new Promise((resolve, reject) => {
            let url = process.env.REACT_APP_API_URL + "/classroom/all-classrooms?";
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
                // setUserData(result.data)
                resolve({
                  data: result.data,
                  page: result.page - 1,
                  totalCount: result.total,
                });
              });
          })
        }
        title="Classrooms"
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
        detailPanel={(rowData) => {
          return (
            <section style={{ padding: "16px" }}>
              <Grid container direction="row">
                <Grid item xs={8}>
                  <Grid container direction="column" spacing={1}>
                    {rowData.teachers?.length > 0 && (
                      <Fragment>
                        <Grid item>
                          <Typography variant="h6">Teachers</Typography>
                        </Grid>
                        <Grid item>
                          <Stack direction="row" spacing={1.5}>
                            {rowData.teachers.map((teacher) => (
                              <Chip
                                avatar={<Avatar alt={teacher.name} src={teacher.avatar} />}
                                label={teacher.name}
                                size="medium"
                                variant="outlined"
                                sx={{ backgroundColor: "#e04646", color: "white" }}
                              />
                            ))}
                          </Stack>
                        </Grid>
                      </Fragment>
                    )}
                    {rowData.students?.length > 0 && (
                      <Fragment>
                        <Grid item>
                          <Typography variant="h6">Students</Typography>
                        </Grid>
                        <Grid item>
                          <Stack direction="row" spacing={1.5}>
                            {rowData.students.map((student) => (
                              <Chip
                                avatar={<Avatar alt={student.name} src={student.avatar} />}
                                label={student.name}
                                size="medium"
                                variant="outlined"
                                sx={{ backgroundColor: "#cdc6c6", color: "black" }}
                              />
                            ))}
                          </Stack>
                        </Grid>
                      </Fragment>
                    )}
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container direction="column" spacing={1.5}>
                    {rowData.grade_structure && (
                      <Fragment>
                        <Grid item>
                          <Typography variant="h5">Grade Structure</Typography>
                        </Grid>
                        <Grid item>
                          <table class="grade-structure">
                            <tr>
                              <th>Name</th>
                              <th>Max point</th>
                            </tr>
                            {rowData.grade_structure.map((grade) => (
                              <tr data-ng-repeat="customer in people | filter: table">
                                <td>{grade.name}</td>
                                <td>{grade.max}</td>
                              </tr>
                            ))}
                          </table>
                        </Grid>
                      </Fragment>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </section>
          );
        }}
      />
    </div>
  );
};

export default ClassTable;
