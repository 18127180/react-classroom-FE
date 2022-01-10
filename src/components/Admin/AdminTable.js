import { useState, forwardRef, useRef, useContext } from "react";
import MaterialTable from "material-table";
// import Button from "@mui/material/Button";
import Button from "@material-ui/core/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import BackdropProvider from "../../contexts/BackdropProvider";
import theme from "../../theme/theme";
import { ThemeProvider } from "@mui/styles";

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
import EmailIcon from "@mui/icons-material/Email";
import AddIcon from "@mui/icons-material/Add";

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

const validationSchema = yup.object({
  first_name: yup.string("Enter user's first name").max(255).required("First name is required"),
  last_name: yup.string("Enter user's last name").max(255).required("Last name is required"),
  email: yup
    .string("Enter user's email")
    .max(255)
    .email("Email is invalid")
    .required("Email is required"),
  password: yup
    .string("Enter user password")
    .min(6, "Password must have at least 6 characters")
    .max(255)
    .required("Password is required"),
});

const AdminTable = () => {
  const access_token = localStorage.getItem("access_token");
  const [open, setOpen] = useState(false);
  const tableRef = useRef();
  const { setOpenSnack } = useContext(BackdropProvider.context);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role: "Admin",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/user/admins`,
          {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            password: values.password,
            role: values.role,
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then((res) => {
          tableRef.current.onQueryChange();
          setOpenSnack("success", "Admin has been added.", 4000);
        })
        .catch((err) => {
          console.log(err);
          setOpenSnack("error", "Something's wrong. Please try again later", 5000);
        });
      formik.resetForm();
      setOpen(false);
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          tableRef={tableRef}
          icons={tableIcons}
          columns={[
            { title: "ID", field: "id", sorting: false, searchable: false },
            { title: "First name", field: "first_name", sorting: false },
            { title: "Last name", field: "last_name", sorting: false },
            { title: "Email", field: "email", sorting: false },
            { title: "Created at", field: "createdAt", type: "date", searchable: false },
          ]}
          // data={data}
          data={(query) =>
            new Promise((resolve, reject) => {
              console.log(query);
              let url = process.env.REACT_APP_API_URL + "/user/admins?";
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
                  resolve({
                    data: result.data,
                    page: result.page - 1,
                    totalCount: result.total,
                  });
                });
            })
          }
          title="Administrators"
          options={{
            actionsColumnIndex: -1,
          }}
          actions={[
            {
              icon: () => <AddIcon />,
              tooltip: "Add User",
              isFreeAction: true,
              onClick: (_event) => handleClickOpen(),
            },
          ]}
          onRowClick={(_event, _rowData, togglePanel) => togglePanel()}
          detailPanel={(rowData) => {
            return (
              <section class="user-detail">
                <div class="profile-info">
                  <img
                    src="https://source.unsplash.com/100x100/?face"
                    alt={rowData.first_name + " " + rowData.last_name}
                  />
                  <div class="desc">
                    <h3 class="name">{rowData.first_name + " " + rowData.last_name}</h3>
                    <h5>{rowData.role}</h5>
                    <h5>
                      {" "}
                      Date joined:{" "}
                      <strong>
                        {new Date(rowData.createdAt).toLocaleString().split(" ")[1]}
                      </strong>{" "}
                    </h5>
                  </div>
                </div>
                <div class="basic-details profile-item">
                  <h4> Basic Details </h4>
                  <ul class="info">
                    <li>
                      {" "}
                      <EmailIcon />
                      <span class="email-text"> meangelino@toyota.con </span>{" "}
                    </li>
                  </ul>
                </div>
              </section>
            );
          }}
        />
        <Dialog open={open} onClose={handleClose}>
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>Create admin account</DialogTitle>
            <DialogContent>
              <DialogContentText>
                A new admin account require new email, a password and its specific role
              </DialogContentText>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    // autoComplete="given-name"
                    name="first_name"
                    fullWidth
                    id="first_name"
                    label="First Name"
                    margin="dense"
                    variant="standard"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                    helperText={formik.touched.first_name && formik.errors.first_name}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="last_name"
                    label="Last Name"
                    name="last_name"
                    margin="dense"
                    variant="standard"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                    helperText={formik.touched.last_name && formik.errors.last_name}
                  />
                </Grid>
              </Grid>
              <TextField
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                fullWidth
                variant="standard"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                margin="dense"
                id="password"
                name="password"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                autoComplete="false"
                margin="dense"
                id="role"
                name="role"
                label="Role"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values.role}
                onChange={formik.handleChange}
                error={formik.touched.role && Boolean(formik.errors.role)}
                helperText={formik.touched.role && formik.errors.role}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Create
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

export default AdminTable;
