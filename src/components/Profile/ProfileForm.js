import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Avatar, Button, Container, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import UserProvider from "../../contexts/UserProvider";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/theme";
import ChangePassword from "./ChangePassword";

const styles = {
  responsive: {
    "@media screen and (max-width: 600px)": {
      maxWidth: "none",
      flexGrow: 1,
    },
  },
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  padding: "16px",
  borderRadius: "10px",
}));

const validationSchema = yup.object({
  first_name: yup.string("Enter first name").required("First name is required"),
  last_name: yup.string("Enter last name").required("Last name is required"),
  student_id: yup.string("Enter your student id"),
});

const ProfileForm = () => {
  const [user, setUser] = React.useContext(UserProvider.context);

  const access_token = localStorage.getItem("access_token");
  const formik = useFormik({
    initialValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      student_id: user.student_id || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post(
          process.env.REACT_APP_API_URL + "/user",
          {
            first_name: values.first_name,
            last_name: values.last_name,
            student_id: values.student_id,
          },
          {
            headers: {
              Authorization: "Bearer " + access_token,
            },
          }
        )
        .then((res) => {
          // console.log(res.data);
          if (res.status === 200) {
            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("access_token", res.data.access_token);
            alert("Update success");
          } else alert("Something's wrong. Please try again later");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <form onSubmit={formik.handleSubmit}>
          <Container maxWidth="lg" sx={{ marginTop: 11, maxWidth: "1100px !important" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={3}>
                <Grid item xs={3.5} sx={styles.responsive}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Item>
                        <Grid container alignItems="center" flexDirection="column">
                          <Avatar
                            alt={user.first_name + " " + user.last_name}
                            src={user.avatar}
                            sx={{ width: 100, height: 100, boxShadow: 4 }}
                          ></Avatar>
                          <Typography variant="h6">
                            {user.first_name + " " + user.last_name}
                          </Typography>
                          <Typography variant="p">UserID: {user.id}</Typography>
                        </Grid>
                      </Item>
                    </Grid>
                    <Grid item xs={12}>
                      <Item>
                        <Grid container alignItems="center" flexDirection="column">
                          <ChangePassword />
                        </Grid>
                      </Item>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={8.5} sx={styles.responsive}>
                  <Item>
                    <Grid container direction="column" alignItems="center" sx={{ gap: "8px" }}>
                      <Typography variant="h5">User Information</Typography>
                      <Grid container direction="row" spacing={3}>
                        <Grid item xs={6} sx={styles.responsive}>
                          <TextField
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            id="first_name"
                            name="first_name"
                            label="First name"
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                            error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                            helperText={formik.touched.first_name && formik.errors.first_name}
                          />
                        </Grid>
                        <Grid item xs={6} sx={styles.responsive}>
                          <TextField
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            id="last_name"
                            name="last_name"
                            label="Last name"
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                            helperText={formik.touched.last_name && formik.errors.last_name}
                          />
                        </Grid>
                      </Grid>
                      <Grid container direction="row" spacing={3}>
                        <Grid item xs={6} sx={styles.responsive}>
                          <TextField
                            disabled
                            fullWidth
                            margin="dense"
                            variant="filled"
                            id="email"
                            name="email"
                            label="Email"
                            value={user.email}
                          />
                        </Grid>
                        <Grid item xs={6} sx={styles.responsive}>
                          <TextField
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            id="student_id"
                            name="student_id"
                            label="Student ID"
                            value={formik.values.student_id}
                            onChange={formik.handleChange}
                            error={formik.touched.student_id && Boolean(formik.errors.student_id)}
                            helperText={formik.touched.student_id && formik.errors.student_id}
                          />
                          <Typography variant="p">
                            * This field is needed to map your grade in classes that you enrolled.
                          </Typography>
                        </Grid>
                      </Grid>
                      <Button variant="contained" sx={{ marginTop: 2 }} type="submit">
                        Save
                      </Button>
                    </Grid>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </form>
      </ThemeProvider>
    </div>
  );
};

export default ProfileForm;
