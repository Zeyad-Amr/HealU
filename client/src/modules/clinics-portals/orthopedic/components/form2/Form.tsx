import React, { useState, useRef, SetStateAction } from "react"






import './Form.module.css'; // Import the CSS file

interface FormProps {
  formHeading: string;
  labelFieldName: string;
}

const SimpleForm: React.FC<FormProps> = ({ formHeading, labelFieldName }) => {
  const [fieldValue, setFieldValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted with value:', fieldValue);
  };

  return (
    <div className="my-form-container">
      <h2 className="my-form-heading">{formHeading}</h2>
      <form onSubmit={handleSubmit}>
        <label className="my-form-label">
          {labelFieldName}:
          <input type="text" value={fieldValue} onChange={handleChange} className="my-form-input" />
        </label>
        <button type="submit" className="my-form-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SimpleForm;
