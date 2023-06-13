import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
function Editor({ getContent = () => {}, ...rest }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      // ["link", "image"],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    // "image",
    "background",
    "align",
    "size",
    "font",
  ];

  return (
    <>
      <ReactQuill
        {...rest}
        theme="snow"
        modules={modules}
        formats={formats}
        // value={code}
        // onChange={handleProcedureContentChange}
      />
    </>
  );
}

export default Editor;
