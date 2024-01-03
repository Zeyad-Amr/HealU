import { Label } from "@mui/icons-material";
import { title } from "process";
import React from "react";

// prop for textarea
interface CustomTextAreaProps {
  title: string;
  height: number;
  placeholder: string;
  value: string;
}

// add props to textarea
function CustomTextArea({
  title,
  placeholder,
  value,
  height,
}: CustomTextAreaProps) {
  return (
    <div>
      <label>{title}</label>
      <br />

      <textarea placeholder={placeholder} rows={height}>
        {value}
      </textarea>
    </div>
  );
}

export default CustomTextArea;
