import React from "react";
import "../../styles/error.css";

const Error = () => {
  return (
    <div className="container">
      <div className="gif">
        <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
      </div>
      <div className="content">
        <h1 className="main-heading">This page is gone.</h1>
        <p className="description">
          ...maybe the page you're looking for is not found or never existed.
        </p>
        <a href="/">
          <button className="back">Back to home</button>
        </a>
      </div>
    </div>
  );
};

export default Error;
