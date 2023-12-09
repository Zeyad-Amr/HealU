import React from 'react';
import './title.css'; // Import the CSS file

const ClinicTitle = ({ title }: { title: string }) => {
  return <h1 className="title">{title}</h1>;
};

export default ClinicTitle;
