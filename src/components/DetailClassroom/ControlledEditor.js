import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ControlledEditor = () => {
  const [value, setValue] = useState("");
  return (
    // <ThemeProvider theme={defaultTheme}>
    //   <MUIRichTextEditor label="Type something here..." />
    // </ThemeProvider>
    <ReactQuill theme="snow" value={value} onChange={setValue} />
  );
};

export default ControlledEditor;
