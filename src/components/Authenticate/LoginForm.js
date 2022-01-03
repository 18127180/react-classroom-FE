import React, { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Link as RouterLink } from "react-router-dom";
import { FacebookLoginButton } from "react-social-login-buttons";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SimpleBackdrop from "../utils/Backdrop";
import { useFormik } from "formik";
import * as yup from "yup";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import BackdropProvider from "../../contexts/BackdropProvider";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="/">
        ClassroomSPA
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const CLIENT_ID = "780592097647-hif1svldddrkc4jpojqc44paile3l8da.apps.googleusercontent.com";

const validationSchema = yup.object({
  email: yup
    .string("Enter user's email")
    .max(255)
    .email("Email is invalid")
    .required("Email is required"),
  password: yup.string("Enter user password").max(255).required("Password is required"),
});

const LoginForm = ({ section, topic, room, name }) => {
  const { setOpenSnack } = useContext(BackdropProvider.context);
  const [state, setState] = useState({
    isLoggedIn: false,
    userInfo: {
      name: "",
      emailId: "",
    },
  });
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/classroom");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const responseFacebook = (response) => {
    setOpenBackdrop(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/facebook?access_token=${response.accessToken}`)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("access_token", res.data.access_token);
          const current_link = localStorage.getItem("current_link");
          if (current_link) {
            localStorage.removeItem("current_link");
            navigate(current_link);
          } else {
            navigate("/classroom");
          }
          // let userInfo = {
          //   name: res.data.user.name,
          //   emailId: res.data.user.email,
          // };
          // setState({ userInfo, isLoggedIn: true });
        }
        if (res.status === 401) {
          //basic log out process
          localStorage.removeItem("user");
          localStorage.removeItem("access_token");
          navigate("/login");
        }
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    isInitialValid: false,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setOpenBackdrop(true);
      axios
        .post(`${process.env.REACT_APP_API_URL}/auth`, {
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          if (res.status === 200) {
            // setState({ userInfo, isLoggedIn: true });
            console.log(res.data);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("access_token", res.data.access_token);
            const current_link = localStorage.getItem("current_link");
            if (current_link) {
              localStorage.removeItem("current_link");
              navigate(current_link);
            } else {
              console.log(res.data.user);

              if (res.data.user.role) {
                navigate("/admin/admins");
              } else {
                navigate("/classroom");
              }
            }
          }
        })
        .catch((err) => {
          if (err.response?.status === 401) {
            setOpenBackdrop(false);
            setOpen(true);
          }
          console.log(err);
        });
    },
  });

  const responseGoogleSuccess = async (response) => {
    setOpenBackdrop(true);
    let userInfo = {
      token: response?.tokenId,
      email: response.profileObj.email,
    };
    // setState({ userInfo, isLoggedIn: true });
    //call API post authenticate
    axios.post(`${process.env.REACT_APP_API_URL}/auth/google`, userInfo).then((res) => {
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("access_token", res.data.access_token);
        // let userInfo = {
        //   name: res.data.user.name,
        //   emailId: res.data.user.email,
        // };
        // setState({ userInfo, isLoggedIn: true });
        const current_link = localStorage.getItem("current_link");
        if (current_link) {
          localStorage.removeItem("current_link");
          navigate(current_link);
        } else {
          navigate("/classroom");
        }
      }
    });
  };

  const responseGoogleError = (response) => {
    console.log(response);
  };

  const logout = (response) => {
    console.log(response);
    let userInfo = {
      name: "",
      emailId: "",
    };
    setState({ userInfo, isLoggedIn: false });
  };

  const handleForgetPassword = () => {
    const email = formik.values.email;
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.exec(email)) {
      setOpenSnack("error", "Please provide a valid email", 4000);
    }

    axios
      .post(process.env.REACT_APP_API_URL + "/auth/forgot-password", {
        email,
      })
      .then((res) => {
        setOpenSnack("info", "Password has been sent to email " + email, 6000);
      })
      .catch((err) => {
        setOpenSnack("error", "Can't connect to mail service", 5000);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              mt: 6,
              mb: 2,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" onClick={handleForgetPassword} variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  {/* <RouterLink to="/register"> */}
                  <Link component={RouterLink} to="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                  {/* </RouterLink> */}
                </Grid>
              </Grid>
              {state.isLoggedIn ? (
                <div>
                  <h1>Welcome, {state.userInfo.name}</h1>

                  <GoogleLogout
                    clientId={CLIENT_ID}
                    buttonText={"Logout"}
                    onLogoutSuccess={logout}
                  ></GoogleLogout>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 10,
                  }}
                >
                  <GoogleLogin
                    clientId={CLIENT_ID}
                    buttonText="Log in with Google"
                    onSuccess={responseGoogleSuccess}
                    onFailure={responseGoogleError}
                    //isSignedIn={true}
                    cookiePolicy={"single_host_origin"}
                  />
                  <FacebookLogin
                    appId="896620704300555"
                    // autoLoad
                    fields="name,email,picture,gender"
                    callback={responseFacebook}
                    render={(renderProps) => (
                      <FacebookLoginButton
                        onClick={renderProps.onClick}
                        style={{ width: 200, margin: 0, fontSize: 13.5 }}
                      />
                    )}
                  />
                </div>
              )}
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <SimpleBackdrop state={openBackdrop} handleClose={() => setOpenBackdrop(false)} />
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          User account cannot be signed in.
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default LoginForm;
