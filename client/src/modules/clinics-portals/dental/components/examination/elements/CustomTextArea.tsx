import { Label } from "@mui/icons-material";
import { title } from "process";
import React from "react";

// prop for textarea
interface CustomTextAreaProps {
  title: string;
  placeholder: string;
  value: string;
}

// add props to textarea
function CustomTextArea({ title, placeholder, value }: CustomTextAreaProps) {
  return (
    <div>
      <label>{title}</label>
      <br />
      <textarea placeholder={placeholder}>{value}</textarea>
    </div>
  );
}

export default CustomTextArea;
