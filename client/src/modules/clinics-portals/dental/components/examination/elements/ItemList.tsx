import React from "react";
import Item from "./Item";
interface Drug {
  name: string;
  dosage: string;
  time: string;
}

interface DrugListProps {
  drugs?: Drug[];
}

function DrugList({ drugs }: DrugListProps) {
  return (
    <ul>
      {drugs?.map((drug) => (
        <li key={drug.name}>
          <Item name={drug.name} dosage={drug.dosage} time={drug.time} />
        </li>
      ))}
    </ul>
  );
}

export default DrugList;
