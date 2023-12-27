import React from "react";
import "../css/nutrition.css";

interface CardProps {
  name: string;
  weight: number;
  length: number;
  age: number;
}

const Card: React.FC<CardProps> = ({ name, weight, length, age }) => {
  return (
    <div className="card">
      <h1>Personal Data</h1>
      <div className="card-body">
        <p>Name: {name}</p>
        <p>Weight: {weight} kg</p>
        <p>Length: {length} cm</p>
        <p>Age: {age} years</p>
      </div>
    </div>
  );
};

export default Card;
