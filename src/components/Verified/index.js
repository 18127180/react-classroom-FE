import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Verified = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(search);
  const token = query.get("token");
  React.useEffect(() => {
    if (token) {
      axios
        .post(
          process.env.REACT_APP_API_URL + `/verified`,
          {
              token
          }
        )
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("access_token", res.data.access_token);
            navigate("/classroom");
          }
        })
        .catch((err) => {
            navigate("/login");
        });
    }else{
        navigate("/login");
    }
  }, []);

  return (
    <div>

    </div>
  );
};

export default Verified;
