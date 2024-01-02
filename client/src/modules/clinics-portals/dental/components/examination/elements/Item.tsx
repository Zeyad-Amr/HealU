import React from "react";

interface ItemProps {
  name: string;
  dosage: string;
  time: string;
}

function Item({ name, dosage, time }: ItemProps) {
  return (
    <div>
      <b>{name}</b>
      <p>Dosage: {dosage}</p>
      <p>Time: {time}</p>
    </div>
  );
}

export default Item;
