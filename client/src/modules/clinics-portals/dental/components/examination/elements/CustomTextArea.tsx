import React, { ForwardedRef } from "react";
interface CustomTextAreaProps {
  height: number;
  title: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CustomTextArea = React.forwardRef<
  HTMLTextAreaElement,
  CustomTextAreaProps
>(({ height, title, placeholder, value }, ref) => {
  return (
    <textarea
      style={{ height: `${height}rem` }}
      title={title}
      placeholder={placeholder}
      value={value}
      ref={ref}
    />
  );
});

export default CustomTextArea;
// import { Label } from "@mui/icons-material";
// import { title } from "process";
// import React, { ForwardedRef } from "react";

// // prop for textarea
// interface CustomTextAreaProps {
//   title: string;
//   height: number;
//   placeholder: string;
//   value: string;
// }

// // add props to textarea
// function CustomTextArea(
//   { title, placeholder, value, height }: CustomTextAreaProps,
//   ref: ForwardedRef<HTMLTextAreaElement>
// ) {
//   return (
//     <div>
//       <label>{title}</label>
//       <br />

//       <textarea placeholder={placeholder} rows={height} ref={ref}>
//         {value}
//       </textarea>
//     </div>
//   );
// }

// export default CustomTextArea;
