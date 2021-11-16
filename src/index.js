import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import LoginForm from "./components/Authenticate/LoginForm";
import RegisterForm from "./components/Authenticate/RegisterForm";
import Home from "./components/classroom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailClassroom from "./components/DetailClassroom/";
import Profile from "./components/Profile";
import Error from "./components/error/Error";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="register" element={<RegisterForm />} />
      <Route path="profile" element={<Profile />} />
      <Route path="classroom" element={<Home />} />
      <Route path="/detail-classroom/:id*" element={<DetailClassroom />} />
      <Route path="error" element={<Error />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
