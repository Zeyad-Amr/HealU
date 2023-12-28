import { useState } from "react";

const useFormVisibility = (initialVisibility = false) => {
  const [isFormVisible, setIsFormVisible] = useState(initialVisibility);

  const toggleFormVisibility = () => {
    setIsFormVisible((prevVisibility) => !prevVisibility);
  };

  return {
    isFormVisible,
    toggleFormVisibility,
  };
};

export default useFormVisibility;
