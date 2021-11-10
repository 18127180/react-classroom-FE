import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import LoginForm from "./components/Authenticate/LoginForm";
import RegisterForm from "./components/Authenticate/RegisterForm";
import Home from "./components/classroom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailClassroom from "./components/DetailClassroom/";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="register" element={<RegisterForm />} />
      <Route path="classroom" element={<Home />} />
      <Route path="/detail-classroom/*" element={<DetailClassroom />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
