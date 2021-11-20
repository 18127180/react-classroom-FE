import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./AssignmentTab/textEditor.css";

const ControlledEditor = ({ value, setValue }) => {
  return (
    // <ThemeProvider theme={defaultTheme}>
    //   <MUIRichTextEditor label="Type something here..." />
    // </ThemeProvider>
    <div className="text-editor">
      <ReactQuill theme="snow" value={value} onChange={setValue} placeholder="Class description" />
    </div>
  );
};

export default ControlledEditor;
