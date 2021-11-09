import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import LoginForm from "./components/Authenticate/LoginForm";
import RegisterForm from "./components/Authenticate/RegisterForm";
import Home from "./components/classroom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route index path="login" element={<LoginForm />} />
      <Route path="register" element={<RegisterForm />} />
      <Route path="classroom" element={<Home />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
