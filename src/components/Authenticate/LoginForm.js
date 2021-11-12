import React, { useState, useEffect } from "react";
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
import config_data from "../../config.json";
import SimpleBackdrop from "../utils/Backdrop";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href={config_data.WEB_URL}>
        ClassroomSPA
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const CLIENT_ID =
  "780592097647-hif1svldddrkc4jpojqc44paile3l8da.apps.googleusercontent.com";

const LoginForm = ({ section, topic, room, name }) => {
  const [state, setState] = useState({
    isLoggedIn: false,
    userInfo: {
      name: "",
      emailId: "",
    },
  });
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/classroom");
    }
  }, []);

  const responseFacebook = (response) => {
    setOpenBackdrop(true);
    axios
      .post(
        `${config_data.API_URL}/auth/facebook?access_token=${response.accessToken}`
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("access_token", res.data.access_token);
          // let userInfo = {
          //   name: res.data.user.name,
          //   emailId: res.data.user.email,
          // };
          // setState({ userInfo, isLoggedIn: true });
          navigate("/classroom");
        }
        if (res.status === 401) {
          //basic log out process
          localStorage.removeItem("user");
          localStorage.removeItem("access_token");
          navigate("/login");
        }
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpenBackdrop(true);
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    const userForm = {
      email: data.get("email"),
      password: data.get("password"),
    };
    axios.post(`${config_data.API_URL}/auth`, userForm).then((res) => {
      if (res.status === 200) {
        // setState({ userInfo, isLoggedIn: true });
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("access_token", res.data.access_token);
        console.log(res);
        navigate("/classroom");
      }
    });
  };

  const responseGoogleSuccess = async (response) => {
    setOpenBackdrop(true);
    let userInfo = {
      token: response?.tokenId,
      email: response.profileObj.email,
    };
    console.log(userInfo);
    // setState({ userInfo, isLoggedIn: true });
    //call API post authenticate
    axios.post(`${config_data.API_URL}/auth/google`, userInfo).then((res) => {
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("access_token", res.data.access_token);
        // let userInfo = {
        //   name: res.data.user.name,
        //   emailId: res.data.user.email,
        // };
        // setState({ userInfo, isLoggedIn: true });
        navigate("/classroom");
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
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
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
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
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
      <SimpleBackdrop
        state={openBackdrop}
        handleClose={() => setOpenBackdrop(false)}
      />
    </ThemeProvider>
  );
};

export default LoginForm;
